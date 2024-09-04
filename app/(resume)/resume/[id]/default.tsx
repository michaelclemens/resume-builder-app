import { getResumeFull } from '@/lib/client/resume'
import ResumePreview from '@/components/preview/ResumePreview'

export default async function DefaultPage({ params: { id } }: { params: { id: string } }) {
  const resume = await getResumeFull(id)
  return <ResumePreview resume={resume} />
}
