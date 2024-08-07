import { useSectionList } from "@/hooks";
import { SectionEnums } from "@/types/section";
import { sortByOrder } from "@/util/sort";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Strength } from "@prisma/client"

export default ({ strengths: initialStrengths }: { strengths: Strength[] }) => {
    const [animationParent] = useAutoAnimate();
    const { items: strengths } = useSectionList(SectionEnums.strength, { initialItems: initialStrengths });

    if (!strengths || !strengths.length) return;

    return (
        <section className="mb-7 text-[8pt]">
            <h3 className="pb-1 border-b border-black font-bold uppercase tracking-[0.2em]">Strengths</h3>
            <ul ref={animationParent}>
                {strengths.sort(sortByOrder).map(strength => <li key={strength.id} className="my-3">{strength.name}</li>)}
            </ul>
        </section>
    )
}