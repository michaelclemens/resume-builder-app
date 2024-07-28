import { FormSkill, ListSkills } from "@/components";
import { getSkills } from "@/lib/client/skill";

export default async({ params: { id } }: { params: { id: string }}) => {
    const skills = await getSkills(id);
    return (
        <>
            <ListSkills skills={skills}/>
            <FormSkill resumeId={id} />
        </>
    )
}