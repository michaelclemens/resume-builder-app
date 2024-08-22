import { Personal } from '@prisma/client'

export default function Header({ personal }: { personal: Personal | null }) {
  if (!personal) return

  return (
    <div className="mb-7">
      <div className="mb-2 font-oswald text-3xl font-medium">
        {personal?.firstName} {personal?.lastName}
      </div>
      <div className="text-[6.5pt] uppercase tracking-widest">{personal?.position}</div>
    </div>
  )
}
