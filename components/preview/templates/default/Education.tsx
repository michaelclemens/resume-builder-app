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
        <section className="pt-5 text-[8pt]">
            <h3 className="mb-3 pb-1 border-b border-black font-bold uppercase tracking-[0.2em]">Education</h3>
            <ul ref={animationParent}>
                {educations.sort(sortByOrder).map(education => (
                    <li key={education.id}>
                        <p className="flex justify-between">
                            <span className="text-[9pt] font-bold">{education.degree}, {education.school}</span>
                            {education.city}
                        </p>
                        <p>
                            {new Date(education.startDate).toDateString()}
                            {education.endDate && ` - ${new Date(education.endDate).toDateString()}`}
                        </p>
                        {education.description && <div className="mt-2"><RenderHtml html={education.description ?? ''} /></div>}
                    </li>
                ))}
            </ul>
        </section>
    )
}