import { builder } from '@/graphql/builder'
import { resolveCursorConnection, ResolveCursorConnectionArgs } from '@pothos/plugin-relay'
import { container } from '@/lib/ioc/config'
import { TYPES } from '@/lib/ioc/types'
import type { PostService } from '@/services'

builder.queryFields(t => ({
  post: t.field({
    type: 'Post',
    nullable: true,
    args: {
      id: t.arg.int({ required: true })
    },
    resolve: async (_, { id }, ctx) => {
      const postService = container.get<PostService>(TYPES.PostService)
      return await postService.findFromId(id)
    }
  }),
  posts: t.connection({
    type: 'Post',
    args: {
      ids: t.arg.stringList()
    },
    resolve: async (_, args, ctx) => {
      const postService = container.get<PostService>(TYPES.PostService)
      const total = await postService.getTotalPost()
      const result = await resolveCursorConnection(
        {
          args,
          toCursor: post => post.id.toString(),
        },
        ({ limit, inverted, before, after }: ResolveCursorConnectionArgs) => {
          return postService.getAllPosts({
            limit,
            inverted,
            before: Number(before) || undefined,
            after: Number(after) || undefined,
          })
        }
      )
      return { total, ...result }
    },
  })
}))
