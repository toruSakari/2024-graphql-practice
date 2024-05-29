import { builder } from '@/graphql/builder'
import { z } from '@/lib'
import type { AuthService } from '@/services'
import { container } from '@/lib/ioc/config'
import { TYPES } from '@/lib/ioc/types'

builder.mutationFields(t => ({
  login: t.field({
    type: 'Result',
    nullable: false,
    args: {
      email: t.arg.string({
        validate: {
          schema: z.string().email()
        },
        required: true
      })
    },
    resolve: async (_, { email }, ctx) => {
      const authService = container.get<AuthService>(TYPES.AuthService)
      const success = await authService.login(ctx.request, email)
      return { success }
    }
  })
}))
