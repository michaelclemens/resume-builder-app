import { sortByOrder } from "@/util/sort";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Skill } from "@prisma/client"

export default ({ skills }: { skills: Skill[] }) => {
    if (!skills.length) return;
    
    const [animationParent] = useAutoAnimate();
    return (
        <section>
            <h3 className="text-xl pb-1 border-b font-semibold">Experience</h3>
            <ul ref={animationParent} className="mt-2 mb-10">
                {skills.sort(sortByOrder).map(skill => <li key={skill.id} className="px-2 mt-1">{skill.name}</li>)}
            </ul>
        </section>
    )
}