import { EducationSection, EmploymentSection, FormPersonal, ResumePreview, SkillSection, StrengthSection } from "@/components";
import { getResume } from "@/lib/client/resume";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default async function Resume({ id }: { id: string }) {
    const resume = await getResume(id);
    if (!resume) notFound()

    return (
        <div className="w-full flex flex-row flex-grow overflow-hidden">
            <div className="w-2/4 flex-shrink flex-grow-0">
                <div className="sticky top-0 p-4 w-full h-full">
                    <div className="flex flex-col overflow-y-auto h-full">
                        <Suspense><FormPersonal resume={resume} /></Suspense>
                        <Suspense><EmploymentSection resume={resume} /></Suspense>
                        <Suspense><EducationSection resume={resume} /></Suspense>
                        <Suspense><SkillSection resume={resume} /></Suspense>
                        <Suspense><StrengthSection resume={resume} /></Suspense>
                    </div>
                </div>
            </div>
            <main role="main" className="w-full h-full flex-grow p-4 overflow-auto">
                <Suspense><ResumePreview /></Suspense>
            </main>
        </div> 
    )
}