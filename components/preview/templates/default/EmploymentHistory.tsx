import { RenderHtml } from "@/components/util";
import { EmploymentWithHistory } from "@/lib/client/employment";
import { sortByOrder } from "@/util/sort";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default ({ employments }: { employments: EmploymentWithHistory[] }) => {
    if (!employments.length) return;
    
    const [animationParent] = useAutoAnimate();
    return (
        <section>
            <h2 className="text-2xl mt-6 pb-1 border-b font-semibold">Employment History</h2>
            <ul ref={animationParent} className="mt-2">
                {employments.sort(sortByOrder).map(employment => (
                    <li key={employment.id} className="pt-2">
                        <p className="flex justify-between text-sm">
                            <strong className="text-base">{employment.employer}</strong>
                            {employment.city}
                        </p>
                        
                        {(employment.history && employment.history.length) && (
                            <ul ref={animationParent} className="mt-2">
                                {[...employment.history].sort(sortByOrder).map(history => (
                                    <li key={history.id} className="pt-2">
                                        <p className="flex justify-between text-base">{history.title}</p>
                                        <p className="text-justify text-xs">
                                            {new Date(history.startDate).toDateString()}
                                            {history.endDate && ` - ${new Date(history.endDate).toDateString()}`}
                                        </p>
                                        {history.description && <div className="text-justify"><RenderHtml html={history.description ?? ''} /></div>}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </section>
    )
}