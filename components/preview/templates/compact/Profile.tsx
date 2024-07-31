import { RenderHtml } from "@/components/util";
import { usePersonal } from "@/hooks/list";
import { Personal } from "@prisma/client";

export default ({ personal: initialPerson, oswaldClassName }: { personal: Personal|null, oswaldClassName: string }) => {
    const { personal } = usePersonal(initialPerson);

    if ( !personal) return;
    
    return (
        <section className="text-[8pt]">
            <h3 className={`text-xl font-medium ${oswaldClassName}`}>Profile</h3>
            <div className="mt-2"><RenderHtml html={personal.summary ?? ''} /></div>
        </section>
    )
}