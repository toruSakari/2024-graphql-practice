import { text, pgTable, bigint, bigserial } from 'drizzle-orm/pg-core';
import { createdAt, updatedAt } from './timestamp'
import { user } from './user'
import { relations } from 'drizzle-orm'

export const post = pgTable('posts', {
  createdAt,
  updatedAt,
  id: bigserial('id', { mode: 'number'}).primaryKey(),
  content: text('content').notNull(),
  authorId: bigint('author_id', { mode: 'number' }).references(() => user.id).notNull(),
});

export const postRelations = relations(post, ({ one }) => ({
  author: one(user,{
    fields: [post.authorId],
    references: [user.id]
  })
}))

export type Post = typeof post.$inferSelect
export type InsertPost = typeof post.$inferInsert
export type UpdatePost = Partial<Post>
