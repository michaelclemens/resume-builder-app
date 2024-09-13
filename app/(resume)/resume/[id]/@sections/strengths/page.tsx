import { SectionEnums } from '@/types/section'
import { getStrengths } from '@/lib/client/strength'
import { SectionForm } from '@/components/ui/form'
import { SectionList } from '@/components/ui/list'

export default async function StrengthSectionPage({ params: { id } }: { params: { id: string } }) {
  const strengths = await getStrengths(id)
  return (
    <>
      <SectionList sectionType={SectionEnums.strength} initialItems={strengths} emptyText="No Strengths" />
      <SectionForm sectionType={SectionEnums.strength} parentId={id} />
    </>
  )
}
