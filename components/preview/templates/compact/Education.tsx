import { RenderHtml } from "@/components/ui";
import { sortByOrder } from "@/util/sort";
import { Education } from "@prisma/client"

export default function EducationList({ educations }: { educations: Education[] }) {
    if (!educations || !educations.length) return;
    
    return (
        <div className="pt-5 text-[9pt]">
            <h3 className="font-oswald text-xl font-medium">Education</h3>
            <div>
                {educations.sort(sortByOrder).map(education => (
                    <section key={education.id}>
                        <p className="pt-2 text-[10pt] font-bold capitalize">
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