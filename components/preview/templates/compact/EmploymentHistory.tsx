import { RenderHtml } from "@/components/util";
import { useSectionList } from "@/hooks";
import { SectionEnums } from "@/types/section";
import { sortByOrder } from "@/util/sort";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { EmploymentHistory } from "@prisma/client";

export default ({ employmentId, histories: initialHistories }: { employmentId: string, histories: EmploymentHistory[] }) => {
    const [animationParent] = useAutoAnimate();
    const { items: histories } = useSectionList(SectionEnums.employmentHistory, { parentId: employmentId, parentProperty: 'employmentId', initialItems: initialHistories })
    
    if (!histories || !histories.length) return;
    
    return (
        <div ref={animationParent}>
            {histories.sort(sortByOrder).map(history => (
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
    )
}