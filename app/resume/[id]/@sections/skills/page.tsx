import { SectionList } from "@/components/list";
import { getSkills } from "@/lib/client/skill";
import { SectionForm } from "@/components/form";
import { SectionEnums } from "@/types/section";

export default async({ params: { id } }: { params: { id: string }}) => {
    const skills = await getSkills(id);
    return (
        <>
            <SectionList
                sectionType={SectionEnums.skill}
                initialItems={skills}
            />
            <SectionForm
                sectionType={SectionEnums.skill}
                parentId={id} 
            />
        </>
    )
}