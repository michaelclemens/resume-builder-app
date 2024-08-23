import { RenderHtml } from '@/components/ui'
import { Personal } from '@prisma/client'

export default function Profile({ personal }: { personal: Personal | null }) {
  if (!personal) return

  return (
    <section className="text-[9.5pt]">
      <span className="bg-black px-2 py-1 text-[8pt] font-semibold uppercase tracking-widest text-white">Profile</span>
      {personal.summary && (
        <div className="mt-3">
          <RenderHtml html={personal.summary} />
        </div>
      )}
    </section>
  )
}
