import { SectionEnums } from '@/types/section'
import { getEducations } from '@/lib/client/education'
import { SectionForm } from '@/components/ui/form'
import { SectionList } from '@/components/ui/list'

export default async function EducationSectionPage({ params: { id } }: { params: { id: string } }) {
  const educations = await getEducations(id)
  return (
    <>
      <SectionList sectionType={SectionEnums.education} initialItems={educations} emptyText="No Educations" />
      <SectionForm sectionType={SectionEnums.education} parentId={id} />
    </>
  )
}
