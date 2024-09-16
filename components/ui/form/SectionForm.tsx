'use client'

import { useSectionForm } from '@/hooks'
import { Suspense } from 'react'
import { SectionItemType, SectionType } from '@/types/section'
import { getSectionFormBodyComponent } from '@/util/form'
import Loading from '../Loading'

export default function SectionForm({
  sectionType,
  parentId,
  item,
  onSave,
}: {
  sectionType: SectionType
  parentId: string
  item?: SectionItemType
  onSave?: () => void
}) {
  const { save, form, editing } = useSectionForm(sectionType, item)
  const FormBodyComponent = getSectionFormBodyComponent(sectionType)

  return (
    <div className="relative mx-1 mb-1 mt-3 min-h-24 rounded-lg p-3 shadow-md ring-1 ring-slate-300/60 backdrop-blur-sm dark:text-black dark:ring-slate-400/20">
      <form role="form" onSubmit={form.handleSubmit(async formData => save(parentId, formData, onSave))}>
        <Suspense fallback={<Loading />}>
          <FormBodyComponent form={form} editing={editing} />
        </Suspense>
      </form>
      {form.formState.isLoading && <Loading />}
    </div>
  )
}
