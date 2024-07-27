"use client"

import { usePersonalForm } from "@/hooks";
import { InputText, InputTypeEnum, RichTextEditor, SubmitButton } from '@/components/form';
import Loading from "@/app/loading";
import { SubmitHandler } from "react-hook-form";
import { handleErrorResponse, ResponseStatus } from "@/lib/response";
import { PersonalSchemaType } from "@/types/personal";

export default function FormPersonal({ resumeId }: { resumeId: string }) {
    const { loading, save, register, handleSubmit, setError, control, formState: { isSubmitting, errors }} = usePersonalForm(resumeId);

    if (loading) return <Loading/>

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
                    <InputText label="First Name" disabled={isSubmitting} error={errors.firstName?.message} {...register('firstName')} required />
                    <InputText label="Last Name" disabled={isSubmitting} error={errors.lastName?.message} {...register('lastName')} required />
                </div>
                <InputText label="Position" disabled={isSubmitting} error={errors.position?.message} {...register('position')} />

                <RichTextEditor<PersonalSchemaType> name="summary" control={control} />
                <div className="grid grid-cols-2 gap-5">
                    <InputText type={InputTypeEnum.email} label="Email" disabled={isSubmitting} error={errors.email?.message} {...register('email')} />
                    <InputText type={InputTypeEnum.phone} label="Phone" disabled={isSubmitting} error={errors.phone?.message} {...register('phone')} />
                </div>
                <div className="grid grid-cols-2 gap-5">
                    <InputText label="City" disabled={isSubmitting} error={errors.city?.message} {...register('city')} />
                    <InputText label="Country" disabled={isSubmitting} error={errors.country?.message} {...register('country')} />
                </div>

                <SubmitButton label="Save" disabled={isSubmitting} />
            </form>
        </div>
    )
}