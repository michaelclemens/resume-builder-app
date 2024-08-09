import { sortByOrder } from "@/util/sort";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useSectionList } from "@/hooks";
import { EmploymentWithHistory, SectionEnums } from "@/types/section";
import EmploymentHistory from "./EmploymentHistory";

export default ({ employments: initialEmployments, oswaldClassName }: { employments: EmploymentWithHistory[] }) => {
    const [animationParent] = useAutoAnimate();
    const { items: employments } = useSectionList(SectionEnums.employment, { initialItems: initialEmployments });
    
    if (!employments || !employments.length) return;
    
    return (
        <div className="pt-5 text-[9pt]">
            <h3 className={`text-xl font-medium ${oswaldClassName}`}>Employment History</h3>
            <div ref={animationParent}>
                {employments.sort(sortByOrder).map(employment => (
                    <div key={employment.id}>
                        <p className="pt-2 text-[10pt] font-bold">
                            {employment.employer}
                            {employment.city && `, ${employment.city}`}
                        </p>
                        <EmploymentHistory employmentId={employment.id} histories={initialEmployments.find(item => item.id === employment.id)?.history ?? []} />
                    </div>
                ))}
            </div>
        </div>
    )
}