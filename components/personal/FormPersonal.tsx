"use client"

import { usePersonalForm } from "@/hooks/form";
import { InputText, InputTypeEnum, RichTextEditor, SubmitButton } from '@/components/form';
import { SubmitHandler } from "react-hook-form";
import { handleErrorResponse, ResponseStatus } from "@/lib/response";
import { PersonalSchemaType } from "@/types/form";
import { Personal } from "@prisma/client";

export default function FormPersonal({ resumeId, personal }: { resumeId: string, personal?: Personal }) {   
    const { save, register, handleSubmit, setError, control, formState: { isSubmitting, errors }} = usePersonalForm(personal);

    const onSubmit: SubmitHandler<PersonalSchemaType> = async(data) => {
        const response = await save(resumeId, data);

        if (response.status === ResponseStatus.error) {
            return handleErrorResponse(response, setError);
        }
    }

    return (
        <div className="mb-3 mt-2 mx-1 bg-gray-50 p-3 rounded-lg ring-1 ring-slate-700/10">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-5">
                    <InputText label="First Name" disabled={isSubmitting} error={errors.firstName} {...register('firstName')} required />
                    <InputText label="Last Name" disabled={isSubmitting} error={errors.lastName} {...register('lastName')} required />
                </div>
                <InputText label="Position" disabled={isSubmitting} error={errors.position} {...register('position')} />

                <RichTextEditor<PersonalSchemaType> name="summary" control={control} />
                <div className="grid grid-cols-2 gap-5">
                    <InputText type={InputTypeEnum.email} label="Email" disabled={isSubmitting} error={errors.email} {...register('email')} />
                    <InputText type={InputTypeEnum.phone} label="Phone" disabled={isSubmitting} error={errors.phone} {...register('phone')} />
                </div>
                <div className="grid grid-cols-2 gap-5">
                    <InputText label="City" disabled={isSubmitting} error={errors.city} {...register('city')} />
                    <InputText label="Country" disabled={isSubmitting} error={errors.country} {...register('country')} />
                </div>

                <SubmitButton label="Save" disabled={isSubmitting} />
            </form>
        </div>
    )
}