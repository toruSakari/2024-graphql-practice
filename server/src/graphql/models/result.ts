import { builder } from '@/graphql/builder'
import { Result } from '@/types/graphql/schema'

export const ResultType = builder.objectRef<Result>('Result');

builder.objectType(ResultType, {
  name: 'Result',
  fields: t => ({
    success: t.exposeBoolean('success')
  })
})
