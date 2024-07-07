import { EducationSection, EmploymentSection, FormPersonal, SkillSection, StrengthSection } from "@/components";
import { getResume } from "@/lib/client/resume";

export default async function Resume({ id }: { id: string }) {
    const resume = await getResume(id);

    return (
        <div>
            {JSON.stringify(resume)}
            <FormPersonal resumeId={resume.id} personal={resume?.personal || undefined} />
            <EmploymentSection resumeId={resume.id} />
            <EducationSection resumeId={resume.id} />
            <SkillSection resumeId={resume.id} />
            <StrengthSection resumeId={resume.id} />
        </div> 
    )
}