import { usePersonal } from "@/hooks/list";
import { Personal } from "@prisma/client"

export default ({ personal: initialPerson }: { personal?: Personal|null }) => {
    const { personal } = usePersonal(initialPerson);

    if (!personal) return;

    return (
        <section>
            <h3 className="text-xl pb-1 border-b font-semibold">Details</h3>
            <ul className="mt-2 mb-10">
                {(personal.city || personal.country) && (
                    <li className="px-2 mt-1">
                        <div className="font-semibold">Address</div>
                        {personal?.city && <div>{personal.city}</div>}
                        {personal?.country && <div>{personal.country}</div>}
                    </li>
                )}
                {personal.phone && (
                    <li className="px-2 mt-1">
                        <div className="font-semibold">Phone</div>
                        <div>{personal.phone}</div>
                    </li>
                )}
                {personal.email && (
                    <li className="px-2 mt-1">
                        <div className="font-semibold">Email</div>
                        <div>{personal.email}</div>
                    </li>
                )}
            </ul>
        </section>
    )
}