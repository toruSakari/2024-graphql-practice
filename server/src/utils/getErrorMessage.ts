import { ZodError } from 'zod'

export const getErrorMessage = (error: unknown) => {
  switch (true) {
    case error instanceof ZodError:
      return error.issues[0].message
    case error instanceof Error:
      return error.message
    default:
      return 'unknown error'
  }
}
