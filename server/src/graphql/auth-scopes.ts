import type { Context } from '@/context'
import { AuthService } from '@/services'

export const authScopes = (ctx: Context) => ({
  isLoggedIn: new AuthService(ctx).isLoggedIn()
}) as const;
