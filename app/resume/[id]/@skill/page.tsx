import { SkillSection } from "@/components";
import { getSkills } from "@/lib/client/skill";

export default async({ params: { id } }: { params: { id: string }}) => {
    const skills = await getSkills(id);
    return <SkillSection resumeId={id} skills={skills} />
}