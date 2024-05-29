import type { Context } from '@/context'
import { container } from '@/lib/ioc/config'
import { TYPES } from '@/lib/ioc/types'
import type { AuthService } from '@/services'

export const authScopes = (ctx: Context) => ({
  isLoggedIn: () => {
    const authService = container.get<AuthService>(TYPES.AuthService)
    return authService.isLoggedIn(ctx.request)
  }
}) as const;
