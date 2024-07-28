"use client"

import { useEducationForm } from "@/hooks/form";
import { InputText, SubmitButton, InputTypeEnum, RichTextEditor } from "@/components/form";
import { SubmitHandler } from "react-hook-form";
import { EducationSchemaType } from "@/types/form";
import { handleErrorResponse, ResponseStatus } from "@/lib/response";
import { Education } from "@prisma/client";

export default function FormEducation({ resumeId, education, onSave = () => {} }: { resumeId: string, education?: Education, onSave?: () => void }) {
    const { save, register, handleSubmit, setError, reset, control, formState: { isSubmitting, errors }} = useEducationForm(education);
    const editing = !!education;

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
                    <InputText label="School" disabled={isSubmitting} error={errors.school} {...register('school')} required />
                    <InputText label="City" disabled={isSubmitting} error={errors.city} {...register('city')} />
                </div>
                <InputText label="Degree" disabled={isSubmitting} error={errors.degree} {...register('degree')} required />
                <div className="grid grid-cols-2 gap-5">
                    <InputText type={InputTypeEnum.date} label="Start Date" disabled={isSubmitting} error={errors.startDate} {...register('startDate')} required />
                    <InputText type={InputTypeEnum.date} label="End Date" disabled={isSubmitting} error={errors.endDate} {...register('endDate')} />
                </div>
                <RichTextEditor<EducationSchemaType> name="description" control={control} />

                <SubmitButton label={editing ? 'Save' : 'Add Education'} disabled={isSubmitting} />
            </form>
        </div>
    )
}