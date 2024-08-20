import { getEmployments } from "@/lib/client/employment"
import { SectionList } from "@/components/ui/list";
import { SectionForm } from "@/components/ui/form";
import { SectionEnums } from "@/types/section";

export default async function EmploymentSectionPage({ params: { id } }: { params: { id: string }}) {
    const employments = await getEmployments(id);
    return (
        <>
            <SectionList
                sectionType={SectionEnums.employment}
                initialItems={employments}
                emptyText="No Employments"
            />
            <SectionForm
                sectionType={SectionEnums.employment}
                parentId={id}
            />
        </>
    )
}