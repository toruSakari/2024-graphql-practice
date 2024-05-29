import { timestamp } from 'drizzle-orm/pg-core';

export const createdAt = timestamp('created_at').notNull().defaultNow()
export const updatedAt = timestamp('updated_at').notNull().defaultNow()
export const deletedAt = timestamp('deleted_at')
