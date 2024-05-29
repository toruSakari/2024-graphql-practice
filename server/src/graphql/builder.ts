import SchemaBuilder from '@pothos/core'
import type { Context } from '@/context'
import RelayPlugin from '@pothos/plugin-relay'
import { DateResolver } from 'graphql-scalars'
import ValidationPlugin from '@pothos/plugin-validation'
import { getErrorMessage } from '@/utils'
import { authScopes } from '@/graphql/auth-scopes'
import ScopeAuthPlugin from '@pothos/plugin-scope-auth'
import { User, Post } from '@/db/schema'

export const builder = new SchemaBuilder<{
  Objects: {
    User: User,
    Post: Post,
    Result: {
      success: boolean
    }
  }
  Context: Context
  Scalars: {
    Date: {
      Input: Date
      Output: Date
    }
  }
  Connection: {
    total: number;
  }
  AuthScopes: ReturnType<typeof authScopes>;
}>({
  plugins: [RelayPlugin, ValidationPlugin, ScopeAuthPlugin],
  relayOptions: {
    firstArgOptions: {
      defaultValue: 10
    },
  },
  validationOptions: {
    validationError: getErrorMessage,
  },
  authScopes: authScopes,
})

builder.globalConnectionFields(t => ({
  total: t.int({
    nullable: false,
    resolve: (parent) => parent.total,
  })
})
);
builder.addScalarType('Date', DateResolver)
builder.queryType()
builder.mutationType()
