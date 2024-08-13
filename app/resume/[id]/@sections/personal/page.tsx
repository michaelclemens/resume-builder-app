import { SectionForm } from "@/components/form";
import { getPersonal } from "@/lib/client/personal";
import { SectionEnums } from "@/types/section";

export default async function PersonalSectionPage({ params: { id } }: { params: { id: string }}) {
    const personal = await getPersonal(id);
    return (
        <SectionForm
            sectionType={SectionEnums.personal}
            parentId={id}
            item={personal ?? undefined}
        />
    )
}