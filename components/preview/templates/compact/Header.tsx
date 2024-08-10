import { useSectionItem } from "@/hooks";
import { SectionEnums } from "@/types/section";
import { Personal } from "@prisma/client";

export default function Header({ personal: initialPerson, oswaldClassName }: { personal: Personal|null, oswaldClassName: string }) {
    const { item: personal } = useSectionItem(SectionEnums.personal, initialPerson);

    if (!personal) return;
    
    return (
        <div className="mb-7">
            <div className={`mb-2 text-3xl font-medium ${oswaldClassName}`}>{personal?.firstName} {personal?.lastName}</div>
            <div className={"text-[6.5pt] uppercase tracking-widest"}>{personal?.position}</div>
        </div>
    )
}