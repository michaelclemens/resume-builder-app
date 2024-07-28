import { RenderHtml } from "@/components/util";
import { useEducationList } from "@/hooks/list";
import { sortByOrder } from "@/util/sort";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Education } from "@prisma/client"

export default ({ educations: initialEducations }: { educations: Education[] }) => {
    const [animationParent] = useAutoAnimate();
    const { educations } = useEducationList(initialEducations);

    if (!educations || !educations.length) return;
    
    return (
        <section>
            <h2 className="text-2xl mt-6 pb-1 border-b font-semibold">Education</h2>
            <ul ref={animationParent} className="mt-2">
                {educations.sort(sortByOrder).map(education => (
                    <li key={education.id} className="pt-2">
                        <p className="flex justify-between text-sm">
                            <strong className="text-base">{education.degree}, {education.school}</strong>
                            {education.city}
                        </p>
                        <p className="text-justify text-xs">
                            {new Date(education.startDate).toDateString()}
                            {education.endDate && ` - ${new Date(education.endDate).toDateString()}`}
                        </p>
                        {education.description && <div className="text-justify"><RenderHtml html={education.description ?? ''} /></div>}
                    </li>
                ))}
            </ul>
        </section>
    )
}