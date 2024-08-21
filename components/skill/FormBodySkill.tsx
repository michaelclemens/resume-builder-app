'use client'

import { InputText, SubmitButton } from '@/components/ui/form'
import { SkillSchemaType } from '@/types/form'
import { BodyComponentProps } from '@/types/hook'

export default function FormBodySkill({
  form: {
    register,
    formState: { isSubmitting, errors },
  },
  editing,
}: BodyComponentProps<SkillSchemaType>) {
  return (
    <>
      <InputText label='Name' disabled={isSubmitting} error={errors.name} {...register('name')} required />
      <SubmitButton label={editing ? 'Save' : 'Add Skill'} disabled={isSubmitting} />
    </>
  )
}
