import { FieldPath, FieldValues, UseFormSetError } from 'react-hook-form'
import { ZodError } from 'zod'
import { SectionItemType, SectionType } from '@/types/section'

export enum ResponseStatus {
  success = 'success',
  error = 'error',
}

type StatusTypes = keyof typeof ResponseStatus

const createErrorPayload = (error: Error | null | unknown) => {
  let serverError = null
  let formErrors: { path: string; message: string }[] | null = null

  if (error instanceof ZodError) {
    formErrors = []
    const { errors } = error
    for (var i = 0; i < errors.length; i++) {
      formErrors.push({ path: errors[i].path[0] as string, message: errors[i].message })
    }
  } else if (error instanceof Error) {
    serverError = error.message
  }

  return { serverError, formErrors }
}

interface IResponseOptions {
  message?: string
  payload?: { [key in SectionType]?: SectionItemType | null }
  error?: Error | null | unknown
}

export interface IResponse {
  status: StatusTypes
  message?: string
  payload?: { [key in SectionType]?: SectionItemType | null }
  serverError: string | null
  formErrors: { path: string; message: string }[] | null
}

export const response = (status: StatusTypes, { message, payload, error = null }: IResponseOptions) => {
  return {
    status,
    message,
    payload,
    ...createErrorPayload(error),
  }
}

export const handleErrorResponse = <TFieldValues extends FieldValues>(
  { formErrors, message, serverError }: IResponse,
  setError: UseFormSetError<TFieldValues>
) => {
  if (formErrors) {
    for (const { path, message } of formErrors) {
      setError(path as FieldPath<TFieldValues>, { message })
    }
  }
  if (serverError) console.error(serverError)
  if (message) console.error(message)
}
