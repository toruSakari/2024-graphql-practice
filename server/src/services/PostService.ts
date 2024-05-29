import { inject, injectable } from 'inversify';
import { TYPES } from '@/lib/ioc/types'
import type { PostRepository } from '@/repositories'

@injectable()
export class PostService {
  constructor(
    @inject(TYPES.PostRepository) private postRepository: PostRepository
  ) { }

  findFromId(id: number) {
    return this.postRepository.getById(id)
  }

  async getTotalPost() {
    const { total } = await this.postRepository.total()
    return total
  }

  async getTotalFromAuthorId(id: number) {
    const { total } = await this.postRepository.totalFromAuthorId(id)
    return total
  }

  public async getAllAuthorPosts(options :{ limit: number, inverted: boolean, before?: number, after?: number }, authorId: number ) {
    return this.postRepository.findAllFromAuthorId(options, authorId)
  }

  public async getAllPosts(options :{ limit: number, inverted: boolean, before?: number, after?: number }) {
    return this.postRepository.getAll(options)
  }
}
