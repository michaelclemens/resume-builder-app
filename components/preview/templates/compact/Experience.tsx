import { useSectionList } from "@/hooks";
import { SectionEnums } from "@/types/section";
import { sortByOrder } from "@/util/sort";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Skill } from "@prisma/client"

export default ({ skills: initialSkills, oswaldClassName }: { skills: Skill[] }) => {
    const [animationParent] = useAutoAnimate();
    const { items: skills } = useSectionList(SectionEnums.skill, { initialItems: initialSkills });

    if (!skills || !skills.length) return;
    
    return (
        <section className="mb-7 text-[8pt]">
            <h3 className={`text-sm font-medium ${oswaldClassName}`}>Experience</h3>
            <ul ref={animationParent}>
                {skills.sort(sortByOrder).map(skill => <li key={skill.id} className="my-2">{skill.name}</li>)}
            </ul>
        </section>
    )
}