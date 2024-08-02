import { usePersonal } from "@/hooks/list";
import { Personal } from "@prisma/client";

export default ({ personal: initialPerson }: { personal: Personal|null }) => {
    const { personal } = usePersonal(initialPerson);

    if (!personal) return;
    
    return (
        <div className="flex justify-center">
            <div className="absolute flex flex-col mt-10 px-16 py-10 text-center uppercase bg-white ring-1 ring-black">
                <div className="mb-1 text-2xl font-bold tracking-widest">{personal?.firstName} {personal?.lastName}</div>
                <div className="text-sm">{personal?.position}</div>
            </div>
        </div>
    )
}