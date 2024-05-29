import { eq, count, and, gt, lt, asc, desc } from 'drizzle-orm'
import { user } from '@/db/schema'
import { injectable, inject } from 'inversify'
import { TYPES } from '@/lib/ioc/types'
import { Database } from '@/db'
import type { InsertUser, User, UpdateUser } from '@/db/schema'

@injectable()
export class UserRepository {
  constructor(
    @inject(TYPES.Database) private db: Database
  ) { }

  public getById(id: User['id']) {
    return this.db.getDb().query.user.findFirst({
        where: eq(user.id, id),
        with: {
          posts: {}
        }
      })
  }

  public getByEmail(email: User['email']) {
    return this.db.getDb().query.user.findFirst({
      where: eq(user.email, email),
      with: {
        posts: {}
      }
    })
  }


  public getAll(
    { limit, inverted, before, after }:
    { limit: number, inverted: boolean, before?: number, after?: number }
  ) {
    return this.db.getDb().query.user.findMany({
      limit,
      where: and(
        after ? gt(user.id, after) : undefined,
        before ? lt(user.id, before) : undefined,
      ),
      orderBy: [inverted ? asc(user.id) : desc(user.id)],
      with: {
        posts: {}
      }
    })
  }

  public createUser(input: InsertUser) {
    return this.db.getDb().insert(user).values(input)
  }

  public updateUser(input: UpdateUser) {
    return this.db.getDb().update(user).set(input)
  }

  public async total() {
    return (await this.db.getDb().select({ total: count() }).from(user))[0]
  }
}
