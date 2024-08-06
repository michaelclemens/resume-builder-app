import { FieldPath, FieldValues, UseFormSetError } from "react-hook-form";
import { ZodError } from "zod";

export enum ResponseStatus {
    success = "success",
    error = "error"
}

type StatusTypes = keyof typeof ResponseStatus;

const createErrorPayload = (error: Error|null|unknown) => {
    let serverError = null;
    let formErrors: { path: string, message: string }[] = []
    
    if (error instanceof ZodError) {
        const { errors } = error;
        for (var i = 0; i < errors.length; i++) {
            formErrors.push({ path: errors[i].path[0] as string, message: errors[i].message });
        }
    } else if (error instanceof Error) {
        serverError = error.message
    }

    return { serverError, formErrors }
}

interface IResponseOptions<T> {
    message?: string
    payload?: Partial<T>,
    error?: Error | null | unknown
}

export interface IResponse<T> {
    status: StatusTypes,
    message: string,
    payload: Partial<T>,
    serverError: string | null,
    formErrors: { path: string, message: string }[]
}

export const response = <TPayload extends {}>(status: StatusTypes, { message = '', payload = {}, error = null }: IResponseOptions<TPayload>): IResponse<TPayload> => {
    return {
        status,
        message,
        payload,
        ...createErrorPayload(error)
    }
}

export const handleErrorResponse = <TFieldValues extends FieldValues, TPayload extends {}>({ formErrors, message, serverError }: IResponse<TPayload>, setError: UseFormSetError<TFieldValues>) => {
    for (const { path, message } of formErrors) {
        setError(path as FieldPath<TFieldValues>, { message });
    }
    if (serverError) console.error(serverError);
    if (message) console.error(message);
}