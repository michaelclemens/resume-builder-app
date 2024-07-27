import { sortByOrder } from "@/util/sort";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Strength } from "@prisma/client"

export default ({ strengths }: { strengths: Strength[] }) => {
    if (!strengths || !strengths.length) return;
    
    const [animationParent] = useAutoAnimate();
    return (
        <section>
            <h3 className="text-xl pb-1 border-b font-semibold">Strengths</h3>
            <ul ref={animationParent} className="mt-2 mb-10">
                {strengths.sort(sortByOrder).map(strength => <li key={strength.id} className="px-2 mt-1">{strength.name}</li>)}
            </ul>
        </section>
    )
}