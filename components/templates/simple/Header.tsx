import { Personal } from '@prisma/client'

export default function Header({ personal }: { personal: Personal | null }) {
  if (!personal) return

  return (
    <div className="flex flex-row px-20 py-10">
      <div className="w-3/5 text-4xl font-extrabold uppercase leading-9">
        <div>{personal?.firstName}</div>
        <div>{personal?.lastName}</div>
      </div>
      <div className="w-2/5 text-[9.5pt]">
        <div className="font-bold">{personal?.position}</div>
        <div>
          {personal?.city}
          {personal?.country && `, ${personal.country}`}
        </div>
        {personal?.email && (
          <div>
            <a href={`mailto:${personal.email}`}>{personal.email}</a>
          </div>
        )}
        {personal?.phone && <div>{personal.phone}</div>}
      </div>
    </div>
  )
}
