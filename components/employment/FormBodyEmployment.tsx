"use client"

import { InputText, SubmitButton } from "@/components/form";
import { EmploymentSchemaType } from "@/types/form";
import { BodyComponentProps } from "@/types/hook";

export default function({ form: { register, formState: { isSubmitting, errors } }, editing }: BodyComponentProps<EmploymentSchemaType>) {
    return (
        <>
            <div className="grid grid-cols-2 gap-5">
                <InputText label="Employer" disabled={isSubmitting} error={errors.employer} {...register('employer')} required />
                <InputText label="City" disabled={isSubmitting} error={errors.city} {...register('city')} />
            </div>

            <SubmitButton label={editing ? 'Save' : 'Add Employment'} disabled={isSubmitting} />
        </>
    )
}