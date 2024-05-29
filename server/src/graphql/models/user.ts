import { builder } from '@/graphql/builder'
import type { User, Post } from '@/db/schema'
import './post'
import { PostService } from '@/services'
import { resolveCursorConnection, ResolveCursorConnectionArgs, decodeGlobalID } from '@pothos/plugin-relay'

export const UserType = builder.objectRef<User & {
  posts: Post[]
}>('User');

builder.objectType(UserType, {
  name: 'User',
  fields: t => ({
    id: t.exposeID('id'),
    email: t.exposeString('email'),
    name: t.exposeString('name'),
    createdAt: t.field({
      type: 'Date',
      resolve: parent => parent.createdAt
    }),
    updatedAt: t.field({
      type: 'Date',
      resolve: parent => parent.createdAt
    }),
    posts: t.connection({
      description: 'ユーザーが投稿した記事一覧',
      type: 'Post',
      resolve: async ({ id }, args, ctx) => {
        const postService = new PostService(ctx)
        const { total } = await postService.getTotalFromAuthorId(id)
        const result = await resolveCursorConnection(
          {
            args,
            toCursor: (post) => post.id.toString(),
          },
          (cursorOptions: ResolveCursorConnectionArgs) => {
            return postService.getAllFromAuthorId(cursorOptions, id)
          }
        )
        return { total, ...result }
      },
    })
  })
})
