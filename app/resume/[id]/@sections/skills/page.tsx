import { Form } from "@/components/form";
import { List } from "@/components/list";
import { FormBodySkill, ListItemSkill } from "@/components";
import { useSkillList } from "@/hooks/list";
import { getSkills } from "@/lib/client/skill";
import { useSkillForm } from "@/hooks/form";
import { Skill } from "@prisma/client";
import { SkillSchemaType } from "@/types/form";

export default async({ params: { id } }: { params: { id: string }}) => {
    const skills = await getSkills(id);
    return (
        <>
            <List<Skill>
                useListHook={useSkillList} 
                itemComponent={ListItemSkill} 
                initialItems={skills}
            />
            <Form<Skill, SkillSchemaType>
                parentId={id} 
                useFormHook={useSkillForm} 
                formBody={FormBodySkill}
            />
        </>
    )
}