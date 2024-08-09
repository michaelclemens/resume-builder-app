import { useSectionList } from "@/hooks";
import { sortByOrder } from "@/util/sort";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import EmploymentHistory from "./EmploymentHistory";
import { EmploymentWithHistory, SectionEnums } from "@/types/section";

export default ({ employments: initialEmployments }: { employments: EmploymentWithHistory[] }) => {
    const [animationParent] = useAutoAnimate();
    const { items: employments } = useSectionList(SectionEnums.employment, { initialItems: initialEmployments });

    if (!employments || !employments.length) return;
    
    return (
        <div className="pt-5 text-[8pt]">
            <h3 className="pb-1 border-b border-black font-bold uppercase tracking-[0.2em]">Employment History</h3>
            <div ref={animationParent}>
                {employments.sort(sortByOrder).map(employment => (
                    <div key={employment.id}>
                        <p className="pt-4 flex justify-between">
                            <span className="text-[9pt] font-bold">{employment.employer}</span>
                            {employment.city}
                        </p>
                        <EmploymentHistory employmentId={employment.id} histories={employment.history} />
                    </div>
                ))}
            </div>
        </div>
    )
}