import { RenderHtml } from "@/components/util";
import { usePersonal } from "@/hooks/list";
import { Personal } from "@prisma/client";

export default ({ personal: initialPerson }: { personal: Personal|null }) => {
    const { personal } = usePersonal(initialPerson);

    if ( !personal) return;
    
    return (
        <section>
            <h2 className="text-2xl pb-1 border-b font-semibold">Profile</h2>
            <div className="mt-4">
                <RenderHtml html={personal.summary ?? ''} />
            </div>
        </section>
    )
}