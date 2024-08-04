import usePersonal from "@/hooks/usePersonal";
import { Personal } from "@prisma/client"

export default ({ personal: initialPerson }: { personal?: Personal|null }) => {
    const { personal } = usePersonal(initialPerson);

    if (!personal) return;

    return (
        <section className="mb-7 text-[8pt]">
            <h3 className="pb-1 border-b border-black font-bold uppercase tracking-[0.2em]">Details</h3>
            <ul>
                {(personal.city || personal.country) && (
                    <li className="my-3">
                        <div className="mb-1 text-[6.5pt] font-bold uppercase">Address</div>
                        {personal?.city && <div>{personal.city}</div>}
                        {personal?.country && <div>{personal.country}</div>}
                    </li>
                )}
                {personal.phone && (
                    <li className="my-3">
                        <div className="mb-1 text-[6.5pt] font-bold uppercase">Phone</div>
                        <div>{personal.phone}</div>
                    </li>
                )}
                {personal.email && (
                    <li className="my-3">
                        <div className="mb-1 text-[6.5pt] font-bold uppercase">Email</div>
                        <div>{personal.email}</div>
                    </li>
                )}
            </ul>
        </section>
    )
}