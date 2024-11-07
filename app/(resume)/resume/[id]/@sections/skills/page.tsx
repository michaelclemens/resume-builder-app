import { SectionEnums } from '@/types/section'
import { getSkills } from '@/lib/client/skill'
import { SectionForm } from '@/components/ui/form'
import { SectionList } from '@/components/ui/list'

export default async function SkillSectionPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params

  const { id } = params

  const skills = await getSkills(id)
  return (
    <>
      <SectionList sectionType={SectionEnums.skill} initialItems={skills} emptyText="No Skills" />
      <SectionForm sectionType={SectionEnums.skill} parentId={id} />
    </>
  )
}
