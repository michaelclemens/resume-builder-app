import EducationSection from "@/components/education/EducationSection";
import EmploymentSection from "@/components/employment/EmploymentSection";
import FormPersonal from "@/components/personal/FormPersonal";
import { getResume } from "@/lib/client/resume";

export default async function Resume({ id }: { id: string }) {
    const resume = await getResume(id);

    return (
        <div>
            {JSON.stringify(resume)}
            <FormPersonal resumeId={resume.id} personal={resume?.personal || undefined} />
            <EmploymentSection resumeId={resume.id} />
            <EducationSection resumeId={resume.id} />
        </div> 
    )
}