import { createYoga } from 'graphql-yoga';
import { Hono } from 'hono'
import { PORT } from './config'
import { isDevelopment } from './utils'
import { schema } from '@/graphql/schema'
import { context } from '@/context'
import { useCookies } from '@whatwg-node/server-plugin-cookies'
import '@/lib/i18next'

const yoga = createYoga({
  schema: schema,
  context,
  plugins :[useCookies()]
});

const app = new Hono()

if (isDevelopment()) {
  app.get('/graphql', ctx => yoga(ctx.req.raw, ctx))
}

app.post('/graphql', ctx  => yoga(ctx.req.raw, ctx))

export default {
  port: PORT,
  fetch: app.fetch,
}
