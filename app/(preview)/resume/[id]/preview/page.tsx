import { getResumeFull } from '@/lib/client/resume'
import { ResumeTemplate } from '@/components/preview'

export default async function ResumePreviewPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params

  const { id } = params

  const resume = await getResumeFull(id)
  return <ResumeTemplate resume={resume} />
}
