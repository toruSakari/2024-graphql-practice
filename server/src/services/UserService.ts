import { inject, injectable } from 'inversify'
import { TYPES } from '@/lib/ioc/types'
import type { UserRepository } from '@/repositories'

@injectable()
export class UserService {
  constructor(
    @inject(TYPES.UserRepository)
    private userRepository: UserRepository
  ) { }

  getUser(userId: number) {
    return this.userRepository.getById(userId)
  }

  async getTotalUser() {
    const { total } = await this.userRepository.total()
    return total
  }

  getUsers(options: { limit: number, inverted: boolean, before?: number, after?: number }) {
    return this.userRepository.getAll(options)
  }
}
