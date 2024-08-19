import { RenderHtml } from "@/components/ui";
import { sortByOrder } from "@/util/sort";
import { EmploymentHistory } from "@prisma/client";

export default function EmploymentHistoryList({ histories }: { histories: EmploymentHistory[] }) {
    if (!histories || !histories.length) return;
    
    return (
        <div>
            {histories.sort(sortByOrder).map(history => (
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
    )
}