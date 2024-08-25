import { ResumeTemplate } from '@/components/preview'
import { getResumeFull } from '@/lib/client/resume'

export default async function ResumePreviewPage({ params: { id } }: { params: { id: string } }) {
  const resume = await getResumeFull(id)
  return <ResumeTemplate resume={resume} />
}
