import { RenderHtml } from "@/components/ui";
import { Personal } from "@prisma/client";

export default function Profile({ personal }: { personal: Personal|null }) {
    if ( !personal) return;
    
    return (
        <section className="text-[8pt]">
            <h3 className="pb-1 border-b border-black font-bold uppercase tracking-[0.2em]">Profile</h3>
            <div className="mt-2"><RenderHtml html={personal.summary ?? ''} /></div>
        </section>
    )
}