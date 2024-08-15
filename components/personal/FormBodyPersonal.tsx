"use client"

import { InputText, InputTypeEnum, RichTextEditor, SubmitButton } from '@/components/form';
import { PersonalSchemaType } from "@/types/form";
import { BodyComponentProps } from "@/types/hook";

export default function FormBodyPersonal({ form: { register, control, formState: { isSubmitting, errors } } }: BodyComponentProps<PersonalSchemaType>) {   
    return (
        <>
            <div className="grid grid-cols-2 gap-3">
                <InputText label="First Name" disabled={isSubmitting} error={errors.firstName} {...register('firstName')} required />
                <InputText label="Last Name" disabled={isSubmitting} error={errors.lastName} {...register('lastName')} required />
            </div>
            <InputText label="Position" disabled={isSubmitting} error={errors.position} {...register('position')} />

            <RichTextEditor<PersonalSchemaType> name="summary" control={control} />
            <div className="grid grid-cols-2 gap-3">
                <InputText type={InputTypeEnum.email} label="Email" disabled={isSubmitting} error={errors.email} {...register('email')} />
                <InputText type={InputTypeEnum.phone} label="Phone" disabled={isSubmitting} error={errors.phone} {...register('phone')} />
            </div>
            <div className="grid grid-cols-2 gap-3">
                <InputText label="City" disabled={isSubmitting} error={errors.city} {...register('city')} />
                <InputText label="Country" disabled={isSubmitting} error={errors.country} {...register('country')} />
            </div>

            <SubmitButton label="Save" disabled={isSubmitting} />
        </>
    )
}