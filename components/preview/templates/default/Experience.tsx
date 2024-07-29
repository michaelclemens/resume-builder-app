import { useSkillList } from "@/hooks/list";
import { sortByOrder } from "@/util/sort";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Skill } from "@prisma/client"

export default ({ skills: initialSkills }: { skills: Skill[] }) => {
    const [animationParent] = useAutoAnimate();
    const { skills } = useSkillList(initialSkills);

    if (!skills || !skills.length) return;
    
    return (
        <section className="mb-7 text-[8pt]">
            <h3 className="pb-1 border-b border-black font-bold uppercase tracking-[0.2em]">Experience</h3>
            <ul ref={animationParent}>
                {skills.sort(sortByOrder).map(skill => <li key={skill.id} className="my-3">{skill.name}</li>)}
            </ul>
        </section>
    )
}