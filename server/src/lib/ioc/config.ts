import { Container } from 'inversify'
import { TYPES } from './types'
import { Database } from '@/db'
import { UserService, AuthService, JwtService, CookieService, PostService } from '@/services'
import { UserRepository, PostRepository } from '@/repositories'

const container = new Container
container.bind<Database>(TYPES.Database).to(Database)
// Repositories
container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository)
container.bind<PostRepository>(TYPES.PostRepository).to(PostRepository)
// Services
container.bind<AuthService>(TYPES.AuthService).to(AuthService)
container.bind<CookieService>(TYPES.CookieService).to(CookieService)
container.bind<JwtService>(TYPES.JwtService).to(JwtService)
container.bind<UserService>(TYPES.UserService).to(UserService)
container.bind<PostService>(TYPES.PostService).to(PostService)

export { container }
