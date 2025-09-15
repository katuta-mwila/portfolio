/* using zod*/
import { z } from 'zod'

export interface ProblemDetails{
  message: string,
  globalErrors: string[]
  errors: Record<string, string[]>
}

export const toProblemDetails = (parseResult: z.ZodSafeParseError<any>) =>{
  const errors = z.flattenError(parseResult.error)
  let globalErrors = errors.formErrors.filter(e => e !== "Invalid input")
  if (globalErrors.length === 0 && errors.formErrors.length > 0)
    globalErrors = ["An unexpected error has occured"]

  const problemDetails: ProblemDetails = {
    message: "One or more errors has occured",
    globalErrors,
    errors: errors.fieldErrors as Record<string, string[]> || {}
  }
  return problemDetails
}

export const stringRange = (field: string, min: number, max: number) =>{
  return z.string().min(min, `${field} must be between ${min} and ${max} characters`).max(max, `${field} must be between ${min} and ${max} characters`)
}