import { text, pgTable, bigserial, varchar } from 'drizzle-orm/pg-core';
import { createdAt, updatedAt } from './timestamp'
import { relations } from 'drizzle-orm'
import { post } from './post'

export const user = pgTable('users', {
  createdAt,
  updatedAt,
  id: bigserial('id', { mode: 'number' }).primaryKey(),
  name: text('name').notNull(),
  email: varchar('email', { length: 256 }).notNull()
});

export const userRelations = relations(user, ({ many }) => ({
  posts: many(post)
}))

export type User = typeof user.$inferSelect
export type InsertUser = typeof user.$inferInsert
export type UpdateUser = Partial<User>
