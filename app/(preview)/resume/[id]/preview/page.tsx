import { getResumeFull } from '@/lib/client/resume'
import { ResumeTemplate } from '@/components/preview'

export default async function ResumePreviewPage({ params: { id } }: { params: { id: string } }) {
  const resume = await getResumeFull(id)
  return <ResumeTemplate resume={resume} />
}
