import { SectionEnums } from '@/types/section'
import { getSkills } from '@/lib/client/skill'
import { SectionForm } from '@/components/ui/form'
import { SectionList } from '@/components/ui/list'

export default async function SkillSectionPage({ params: { id } }: { params: { id: string } }) {
  const skills = await getSkills(id)
  return (
    <>
      <SectionList sectionType={SectionEnums.skill} initialItems={skills} />
      <SectionForm sectionType={SectionEnums.skill} parentId={id} />
    </>
  )
}
