import EducationSection from "@/components/education/EducationSection";
import EmploymentSection from "@/components/employment/EmploymentSection";
import { getResume } from "@/lib/client/resume";

export default async function Resume({ id }: { id: string }) {
    const resume = await getResume(id);

    return (
        <div>
            {JSON.stringify(resume)}
            {/* <EmploymentSection resumeId={resume.id} /> */}
            <EducationSection resumeId={resume.id} />
        </div> 
    )
}