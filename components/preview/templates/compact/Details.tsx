import { usePersonal } from "@/hooks/list";
import { Personal } from "@prisma/client"

export default ({ personal: initialPerson, oswaldClassName }: { personal?: Personal|null }) => {
    const { personal } = usePersonal(initialPerson);

    if (!personal) return;

    return (
        <section className="mb-7 text-[8pt]">
            <h3 className={`text-sm font-medium ${oswaldClassName}`}>Details</h3>
            <ul>
                {personal.city && <li className="mt-2 mb-1">{personal.city}</li>}
                {personal.country && <li className="mb-1">{personal.country}</li>}
                {personal.phone && <li className="mb-1">{personal.phone}</li>}
                {personal.email && <li className="mb-1"><a href={`mailto:${personal.email}`}>{personal.email}</a></li>}
            </ul>
        </section>
    )
}