import { RenderHtml } from "@/components/util";
import { useEducationList } from "@/hooks/list";
import { sortByOrder } from "@/util/sort";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Education } from "@prisma/client"

export default ({ educations: initialEducations, oswaldClassName }: { educations: Education[] }) => {
    const [animationParent] = useAutoAnimate();
    const { educations } = useEducationList(initialEducations);

    if (!educations || !educations.length) return;
    
    return (
        <div className="pt-5 text-[9pt]">
            <h3 className={`text-xl font-medium ${oswaldClassName}`}>Education</h3>
            <div ref={animationParent}>
                {educations.sort(sortByOrder).map(education => (
                    <section key={education.id}>
                        <p className="pt-2 text-[10pt] font-bold">
                            {education.degree}, {education.school}
                            {education.city && `, ${education.city}`}
                        </p>
                        <p className="text-[7.5pt] pt-1 uppercase font-thin text-gray-400 tracking-wider">
                            {new Date(education.startDate).toDateString()}
                            {education.endDate && ` - ${new Date(education.endDate).toDateString()}`}
                        </p>
                        {education.description && <div className="mt-2"><RenderHtml html={education.description ?? ''} /></div>}
                    </section>
                ))}
            </div>
        </div>
    )
}