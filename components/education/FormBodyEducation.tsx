'use client'

import { EducationSchemaType } from '@/types/form'
import { BodyComponentProps } from '@/types/hook'
import { InputText, SubmitButton, InputTypeEnum, RichTextEditor } from '@/components/ui/form'

export default function FormBodyEducation({
  form: {
    register,
    control,
    formState: { isSubmitting, errors },
  },
  editing,
}: BodyComponentProps<EducationSchemaType>) {
  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        <InputText label="School" disabled={isSubmitting} error={errors.school} {...register('school')} required />
        <InputText label="City" disabled={isSubmitting} error={errors.city} {...register('city')} />
      </div>
      <InputText label="Degree" disabled={isSubmitting} error={errors.degree} {...register('degree')} required />
      <div className="grid grid-cols-2 gap-3">
        <InputText
          type={InputTypeEnum.month}
          label="Start Date"
          disabled={isSubmitting}
          error={errors.startDate}
          {...register('startDate')}
          required
        />
        <InputText type={InputTypeEnum.month} label="End Date" disabled={isSubmitting} error={errors.endDate} {...register('endDate')} />
      </div>
      <RichTextEditor<EducationSchemaType> name="description" control={control} />

      <SubmitButton label={editing ? 'Save' : 'Add Education'} disabled={isSubmitting} />
    </>
  )
}
