"use client"

import { useEducationForm } from "@/hooks";
import { InputText, SubmitButton, InputTypeEnum } from "@/components/form";
import { SubmitHandler } from "react-hook-form";
import { EducationSchemaType } from "@/types/education";
import { handleErrorResponse, ResponseStatus } from "@/lib/response";

export default function FormEducation({ resumeId, educationId, onSave = () => {} }: { resumeId: string, educationId?: string, onSave?: () => void }) {
    const { save, register, handleSubmit, setError, reset, formState: { isSubmitting, errors }} = useEducationForm(educationId);
    const editing = !!educationId;

    const onSubmit: SubmitHandler<EducationSchemaType> = async(data) => {
        const response = await save(resumeId, data);

        if (response.status === ResponseStatus.error) {
            return handleErrorResponse(response, setError);
        }
        onSave();
        if (!editing) reset();
    }

    return (
        <div className="my-3 mx-1 bg-gray-50 p-3 rounded-lg ring-1 ring-slate-700/10">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-5">
                    <InputText label="School" disabled={isSubmitting} error={errors.school?.message} {...register('school')} required />
                    <InputText label="City" disabled={isSubmitting} error={errors.city?.message} {...register('city')} />
                </div>
                <InputText label="Degree" disabled={isSubmitting} error={errors.degree?.message} {...register('degree')} required />
                <div className="grid grid-cols-2 gap-5">
                    <InputText type={InputTypeEnum.date} label="Start Date" disabled={isSubmitting} error={errors.startDate?.message} {...register('startDate')} required />
                    <InputText type={InputTypeEnum.date} label="End Date" disabled={isSubmitting} error={errors.endDate?.message} {...register('endDate')} />
                </div>
                <InputText type={InputTypeEnum.rte} label="Descripition" disabled={isSubmitting} error={errors.description?.message} {...register('description')} />

                <SubmitButton label={editing ? 'Save' : 'Add Education'} disabled={isSubmitting} />
            </form>
        </div>
    )
}