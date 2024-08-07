import { getEducations } from "@/lib/client/education";
import { Education } from "@prisma/client";
import { EducationSchemaType } from "@/types/form";
import { SectionList } from "@/components/list";
import { SectionForm } from "@/components/form";
import { SectionEnums } from "@/types/section";

export default async({ params: { id } }: { params: { id: string }}) => {
    const educations = await getEducations(id);
    return (
        <>
            <SectionList<Education>
                sectionType={SectionEnums.education}
                initialItems={educations}
                emptyText="No Educations"
            />
            <SectionForm<Education, EducationSchemaType>
                sectionType={SectionEnums.education}
                parentId={id}
            />
        </>
    )
}