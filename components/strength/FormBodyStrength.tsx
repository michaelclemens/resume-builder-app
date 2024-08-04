"use client"

import { InputText, SubmitButton } from '@/components/form';
import { StrengthSchemaType } from '@/types/form';
import { BodyComponentProps } from '@/types/hook';

export default function({ form: { register, formState: { isSubmitting, errors } }, editing }: BodyComponentProps<StrengthSchemaType>) {
    return ( 
        <>
            <InputText label="Name" disabled={isSubmitting} error={errors.name} {...register('name')} required />
            <SubmitButton label={editing ? 'Save' : 'Add Strength'} disabled={isSubmitting} />
        </>
    )
}