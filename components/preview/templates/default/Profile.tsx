import { RenderHtml } from "@/components/util";
import { useSectionItem } from "@/hooks";
import { SectionEnums } from "@/types/section";
import { Personal } from "@prisma/client";

export default ({ personal: initialPerson }: { personal: Personal|null }) => {
    const { item: personal } = useSectionItem(SectionEnums.personal, initialPerson);

    if ( !personal) return;
    
    return (
        <section className="text-[8pt]">
            <h3 className="pb-1 border-b border-black font-bold uppercase tracking-[0.2em]">Profile</h3>
            <div className="mt-2"><RenderHtml html={personal.summary ?? ''} /></div>
        </section>
    )
}