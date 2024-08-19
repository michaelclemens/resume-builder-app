import { getEducations } from "@/lib/client/education";
import { SectionList } from "@/components/ui/list";
import { SectionForm } from "@/components/ui/form";
import { SectionEnums } from "@/types/section";

export default async function EducationSectionPage({ params: { id } }: { params: { id: string }}) {
    const educations = await getEducations(id);
    return (
        <>
            <SectionList
                sectionType={SectionEnums.education}
                initialItems={educations}
                emptyText="No Educations"
            />
            <SectionForm
                sectionType={SectionEnums.education}
                parentId={id}
            />
        </>
    )
}