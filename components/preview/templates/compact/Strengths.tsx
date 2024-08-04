import { useStrengthList } from "@/hooks/list";
import { sortByOrder } from "@/util/sort";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Strength } from "@prisma/client"

export default ({ strengths: initialStrengths, oswaldClassName }: { strengths: Strength[] }) => {
    const [animationParent] = useAutoAnimate();
    const { items: strengths } = useStrengthList({ initialItems: initialStrengths });

    if (!strengths || !strengths.length) return;

    return (
        <section className="mb-7 text-[8pt]">
            <h3 className={`text-sm font-medium ${oswaldClassName}`}>Strengths</h3>
            <ul ref={animationParent}>
                {strengths.sort(sortByOrder).map(strength => <li key={strength.id} className="my-2">{strength.name}</li>)}
            </ul>
        </section>
    )
}