import type { CookieService, JwtService } from './'
import type { UserRepository } from '@/repositories'
import { inject, injectable } from 'inversify'
import { TYPES } from '@/lib/ioc/types'

@injectable()
export class AuthService {
  constructor(
    @inject(TYPES.UserRepository)
    private userRepository: UserRepository,
    @inject(TYPES.CookieService)
    private cookieService: CookieService,
    @inject(TYPES.JwtService)
    private jwtService: JwtService
  ) {}

  public signUp() {

  }

  async login(req: Request, email: string) {
    const dbUser = await this.userRepository.getByEmail(email)

    const token = dbUser?.id ? this.jwtService.sign({ id: dbUser.id }) : null

    if (!token) return false

    await this.cookieService.set(req, 'access_token', token)

    return true
  }

  isLoggedIn(req: Request) {
    const token = req.headers.get('Authorization')?.split(' ')[1]

    if (!token) return false

    const decoded = this.jwtService.verify(token)

    return this.jwtService.isPayLoad(decoded) ? !!decoded.id : false
  }
}
