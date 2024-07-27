import { SkillSection } from "@/components";

export default async({ params: { id } }: { params: { id: string }}) => {
    return <SkillSection resumeId={id} />
}