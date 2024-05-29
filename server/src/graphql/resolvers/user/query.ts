import { builder } from '@/graphql/builder'
import { resolveCursorConnection, ResolveCursorConnectionArgs, decodeGlobalID } from '@pothos/plugin-relay'
import { z } from '@/lib'
import { container } from '@/lib/ioc/config'
import { TYPES } from '@/lib/ioc/types'
import type { UserService } from '@/services'

builder.queryFields(t => ({
  user: t.field({
    type: 'User',
    nullable: true,
    authScopes: {
      isLoggedIn: true,
    },
    args: {
      id: t.arg({
        type: 'String',
        validate: {
          schema: z.string().refine((val) => !isNaN(parseInt(val, 10)))
        },
        required: true,
      })
    },
    resolve: (_, { id }, ctx) => {
      const userService = container.get<UserService>(TYPES.UserService)
      return userService.getUser(Number(id))
    }
  }),
  users: t.connection({
    type: 'User',
    authScopes: {
      isLoggedIn: true,
    },
    resolve: async (_, args, ctx) => {
      const userService = container.get<UserService>(TYPES.UserService)
      const total = await userService.getTotalUser()
      const users = await resolveCursorConnection({
        args,
        toCursor: user => user.id.toString(),
        }, ({ limit, inverted, before, after }: ResolveCursorConnectionArgs) => {
        return userService.getUsers({
          limit,
          inverted,
          before: Number(before) || undefined,
          after: Number(after) || undefined,
        })
      })

      return { total, ...users }
    }
  })
}))
