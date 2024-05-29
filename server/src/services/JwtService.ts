import jwt from 'jsonwebtoken'
import type { JwtPayload, SignOptions } from "jsonwebtoken"
import { JWT_SECRET } from '@/config'

export class JwtService {
  private secret: string
  constructor() {
    this.secret = JWT_SECRET
  }

  public isPayLoad(value: JwtPayload | String | null): value is JwtPayload {
    return value !== null && typeof value === 'object';
  }

  public sign(data: object, options?: SignOptions) {
    return jwt.sign(data, this.secret, options)
  }

  public decode(token: string) {
    return jwt.decode(token);
  }

  public verify(token: string) {
    try {
      return jwt.verify(token, this.secret)
    } catch (e) {
      return null
    }
  }
}
