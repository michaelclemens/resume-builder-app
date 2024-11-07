import { SectionEnums } from '@/types/section'
import { getEmployments } from '@/lib/client/employment'
import { SectionForm } from '@/components/ui/form'
import { SectionList } from '@/components/ui/list'

export default async function EmploymentSectionPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params

  const { id } = params

  const employments = await getEmployments(id)
  return (
    <>
      <SectionList sectionType={SectionEnums.employment} initialItems={employments} emptyText="No Employments" />
      <SectionForm sectionType={SectionEnums.employment} parentId={id} />
    </>
  )
}
