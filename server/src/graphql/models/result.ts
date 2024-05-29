import { builder } from '@/graphql/builder'

export const ResultType = builder.objectRef<{
  success: boolean
}>('Result');

builder.objectType(ResultType, {
  name: 'Result',
  fields: t => ({
    success: t.exposeBoolean('success')
  })
})
