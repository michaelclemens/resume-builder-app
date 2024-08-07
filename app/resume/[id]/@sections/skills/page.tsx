import { SectionList } from "@/components/list";
import { getSkills } from "@/lib/client/skill";
import { Skill } from "@prisma/client";
import { SkillSchemaType } from "@/types/form";
import { SectionForm } from "@/components/form";
import { SectionEnums } from "@/types/section";

export default async({ params: { id } }: { params: { id: string }}) => {
    const skills = await getSkills(id);
    return (
        <>
            <SectionList<Skill>
                sectionType={SectionEnums.skill}
                initialItems={skills}
            />
            <SectionForm<Skill, SkillSchemaType>
                sectionType={SectionEnums.skill}
                parentId={id} 
            />
        </>
    )
}