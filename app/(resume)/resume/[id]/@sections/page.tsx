import { SectionEnums } from '@/types/section'
import { getPersonal } from '@/lib/client/personal'
import { SectionForm } from '@/components/ui/form'

export default async function PersonalSectionPage({ params: { id } }: { params: { id: string } }) {
  const personal = await getPersonal(id)
  return <SectionForm sectionType={SectionEnums.personal} parentId={id} item={personal ?? undefined} />
}
