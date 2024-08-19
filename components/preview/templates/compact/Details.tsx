import { Personal } from "@prisma/client"

export default function Details({ personal }: { personal: Personal|null }) {
    if (!personal) return;

    return (
        <section className="mb-7 text-[8pt]">
            <h3 className="font-oswald text-sm font-medium">Details</h3>
            <ul>
                {personal.city && <li className="mt-2 mb-1">{personal.city}</li>}
                {personal.country && <li className="mb-1">{personal.country}</li>}
                {personal.phone && <li className="mb-1">{personal.phone}</li>}
                {personal.email && <li className="mb-1"><a href={`mailto:${personal.email}`}>{personal.email}</a></li>}
            </ul>
        </section>
    )
}