import { RenderHtml } from "@/components/util";
import { useEmploymentList } from "@/hooks/list";
import { EmploymentWithHistory } from "@/lib/client/employment";
import { sortByOrder } from "@/util/sort";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default ({ employments: initialEmployments, oswaldClassName }: { employments: EmploymentWithHistory[] }) => {
    const [animationParent] = useAutoAnimate();
    const { items: employments } = useEmploymentList({ initialItems: initialEmployments });
    
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
                        
                        {(employment.history && employment.history.length) && (
                            <div ref={animationParent}>
                                {[...employment.history].sort(sortByOrder).map(history => (
                                    <section key={history.id} className="pt-4 last-of-type:mb-0">
                                        <p className="text-[10pt] font-bold">{history.title}</p>
                                        <p className="text-[7.5pt] pt-1 uppercase font-thin text-gray-400 tracking-wider">
                                            {new Date(history.startDate).toDateString()}
                                            {history.endDate && ` - ${new Date(history.endDate).toDateString()}`}
                                        </p>
                                        {history.description && <div className="mt-2"><RenderHtml html={history.description ?? ''} /></div>}
                                    </section>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}