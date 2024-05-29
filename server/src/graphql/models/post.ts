import { builder } from '@/graphql/builder'
import type { Post, User } from '@/db/schema'

export const PostType = builder.objectRef<Post & {
  author: User
}>('Post');

// export const CreatePostInput = builder.inputType('CreatePostInput', {
//   // validate: {
//   //   schema: z.object({
//   //       content: z.string().trim().min(1)
//   //     })
//   //     .passthrough(),
//   // },
//   fields: (t => ({
//     content: t.string({
//       validate: {
//         minLength: [1, {message: }],

//       }
//     })
//   }))

// })

builder.objectType(PostType, {
  name: 'Post',
  fields: t => ({
    id: t.exposeID('id'),
    content: t.exposeString('content'),
    createdAt: t.field({
      type: 'Date',
      resolve: parent => parent.createdAt,
    }),
    updatedAt: t.field({
      type: 'Date',
      resolve: parent => parent.updatedAt,
    }),
    author: t.field({
      description: '投稿したユーザー',
      type: 'User',
      resolve: parent => parent.author
    })
  })
})
