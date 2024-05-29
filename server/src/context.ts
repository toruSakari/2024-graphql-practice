import { db } from '@/db'
import type { Context as HonoContext } from 'hono'
import type { YogaInitialContext } from 'graphql-yoga/typings'

export const context = {
  db,
}

export type Context = HonoContext & YogaInitialContext &  typeof context
