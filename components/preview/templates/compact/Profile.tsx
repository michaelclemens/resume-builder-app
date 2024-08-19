import { RenderHtml } from "@/components/ui";
import { Personal } from "@prisma/client";

export default function Profile({ personal }: { personal: Personal|null }) {
    if (!personal) return;
    
    return (
        <section className="text-[9pt]">
            <h3 className="font-oswald text-xl font-medium">Profile</h3>
            <div className="mt-2"><RenderHtml html={personal.summary ?? ''} /></div>
        </section>
    )
}