import { eq, count, and, gt, lt, asc, desc } from 'drizzle-orm'
import { post } from '@/db/schema'
import { injectable, inject } from 'inversify'
import { TYPES } from '@/lib/ioc/types'
import { Database } from '@/db'
import type { InsertPost, Post, UpdatePost } from '@/db/schema'

@injectable()
export class PostRepository {
  constructor(
    @inject(TYPES.Database) private db: Database
  ) { }

  public getById(id: Post['id']) {
    return this.db.getDb().query.post.findFirst({
        where: eq(post.id, id),
        with: {
          author: {}
        }
      })
  }

  public getAll(
    { limit, inverted, before, after }:
    { limit: number, inverted: boolean, before?: number, after?: number }
  ) {
    return this.db.getDb().query.post.findMany({
      limit,
      where: and(
        after ? gt(post.id, after) : undefined,
        before ? lt(post.id, before) : undefined,
      ),
      orderBy: [inverted ? asc(post.id) : desc(post.id)],
      with: {
        author: {}
      }
    })
  }

  public findAllFromAuthorId(
    { limit, inverted, before, after }:
      { limit: number, inverted: boolean, before?: number, after?: number },
    id: Post['authorId']
  ) {
    return this.db.getDb().query.post.findMany({
      limit,
      where: and(
        after ? gt(post.id, after) : undefined,
        before ? lt(post.id, before) : undefined,
        eq(post.authorId, id)
      ),
      orderBy: [inverted ? asc(post.id) : desc(post.id)],
      with: {
        author: {}
      }
    })
  }

  public createUser(input: InsertPost) {
    return this.db.getDb().insert(post).values(input)
  }

  public updateUser(input: UpdatePost) {
    return this.db.getDb().update(post).set(input)
  }

  public async total() {
    return (await this.db.getDb().select({ total: count() }).from(post))[0]
  }

  public async totalFromAuthorId(id: number) {
    return (await this.db.getDb().select({ total: count() }).from(post).where(eq(post.authorId, id)))[0]
  }
}
