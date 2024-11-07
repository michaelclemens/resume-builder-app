import { getResumeFull } from '@/lib/client/resume'
import ResumePreview from '@/components/preview/ResumePreview'

export default async function DefaultPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params

  const { id } = params

  const resume = await getResumeFull(id)
  return <ResumePreview resume={resume} />
}
