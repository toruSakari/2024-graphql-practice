import { Container } from 'inversify'
import { TYPES } from './types'
import { Database } from '@/db'
import { UserService, AuthService, JwtService, CookieService } from '@/services'
import { UserRepository } from '@/repositories'

const container = new Container
container.bind<Database>(TYPES.Database).to(Database)
// Repositories
container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository)
// Services
container.bind<AuthService>(TYPES.AuthService).to(AuthService)
container.bind<CookieService>(TYPES.CookieService).to(CookieService)
container.bind<JwtService>(TYPES.JwtService).to(JwtService)
container.bind<UserService>(TYPES.UserService).to(UserService)

export { container }
