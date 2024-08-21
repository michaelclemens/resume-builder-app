import { permanentRedirect } from 'next/navigation'

export default async function DefaultSectionPage({ params: { id } }: { params: { id: string } }) {
  permanentRedirect(`/resume/${id}/personal`)
}
