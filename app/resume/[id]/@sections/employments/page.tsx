import { EmploymentWithHistory, getEmployments } from "@/lib/client/employment"
import { EmploymentSchemaType } from "@/types/form";
import { SectionList } from "@/components/list";
import { SectionForm } from "@/components/form";
import { SectionEnums } from "@/types/section";

export default async({ params: { id } }: { params: { id: string }}) => {
    const employments = await getEmployments(id);
    return (
        <>
            <SectionList<EmploymentWithHistory>
                sectionType={SectionEnums.employment}
                initialItems={employments}
                emptyText="No Employments"
            />
            <SectionForm<EmploymentWithHistory, EmploymentSchemaType>
                sectionType={SectionEnums.employment}
                parentId={id}
            />
        </>
    )
}