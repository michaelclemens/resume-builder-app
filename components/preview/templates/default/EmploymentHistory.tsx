import { RenderHtml } from "@/components/util";
import { useEmploymentList } from "@/hooks/list";
import { EmploymentWithHistory } from "@/lib/client/employment";
import { sortByOrder } from "@/util/sort";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default ({ employments: initialEmployments }: { employments: EmploymentWithHistory[] }) => {
    const [animationParent] = useAutoAnimate();
    const { employments } = useEmploymentList(initialEmployments);
    
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
                        
                        {employment.history.length ? (
                            <div ref={animationParent}>
                                {[...employment.history].sort(sortByOrder).map(history => (
                                    <section key={history.id} className="pt-4 last-of-type:mb-0">
                                        <p className="text-[9pt] font-bold">{history.title}</p>
                                        <p>
                                            {new Date(history.startDate).toDateString()}
                                            {history.endDate && ` - ${new Date(history.endDate).toDateString()}`}
                                        </p>
                                        {history.description && <div className="mt-2"><RenderHtml html={history.description ?? ''} /></div>}
                                    </section>
                                ))}
                            </div>
                        ) : null}
                    </div>
                ))}
            </div>
        </div>
    )
}