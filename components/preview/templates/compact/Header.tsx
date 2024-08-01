import { usePersonal } from "@/hooks/list";
import { Personal } from "@prisma/client";

export default ({ personal: initialPerson, oswaldClassName }: { personal: Personal|null, oswaldClassName: string }) => {
    const { personal } = usePersonal(initialPerson);

    if (!personal) return;
    
    return (
        <div className="mb-7">
            <div className={`mb-2 text-3xl font-medium ${oswaldClassName}`}>{personal?.firstName} {personal?.lastName}</div>
            <div className={"text-[6.5pt] uppercase tracking-widest"}>{personal?.position}</div>
        </div>
    )
}