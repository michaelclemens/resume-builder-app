"use client"

import { InputText, InputTypeEnum, RichTextEditor, SubmitButton } from "@/components/ui/form";
import { EmploymentHistorySchemaType } from "@/types/form";
import { BodyComponentProps } from "@/types/hook";

export default function FormBodyHistory({ form: { register, control, formState: { isSubmitting, errors } }, editing }: BodyComponentProps<EmploymentHistorySchemaType>) {
    return (
        <>
            <InputText label="Title" disabled={isSubmitting} error={errors.title} {...register('title')} required />

            <div className="grid grid-cols-2 gap-3">
                <InputText type={InputTypeEnum.date} label="Start Date" disabled={isSubmitting} error={errors.startDate} {...register('startDate')} required />
                <InputText type={InputTypeEnum.date} label="End Date" disabled={isSubmitting} error={errors.endDate} {...register('endDate')} />
            </div>
            <RichTextEditor<EmploymentHistorySchemaType> name="description" control={control} />

            <SubmitButton label={editing ? 'Save' : 'Add Employment History'} disabled={isSubmitting} />
        </>
    )
}