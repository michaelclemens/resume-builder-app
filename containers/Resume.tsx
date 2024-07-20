import { EducationSection, EmploymentSection, FormPersonal, ResumePreview, SkillSection, StrengthSection } from "@/components";
import { getResume } from "@/lib/client/resume";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default async function Resume({ id }: { id: string }) {
    const resume = await getResume(id);
    if (!resume) notFound()

    return (
        <div className="flex gap-x-10 w-full">
            <div className="w-2/6">
                <Suspense><FormPersonal resume={resume} /></Suspense>
                {/* <Suspense><EmploymentSection resume={resume} /></Suspense> */}
                {/* <Suspense><EducationSection resume={resume} /></Suspense> */}
                <Suspense><SkillSection resume={resume} /></Suspense>
                <Suspense><StrengthSection resume={resume} /></Suspense>
            </div>
            <div className="w-4/6">
                <ResumePreview />
            </div>
        </div> 
    )
}