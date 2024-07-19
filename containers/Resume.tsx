'use client'

import Loading from "@/app/loading";
import { EducationSection, EmploymentSection, FormPersonal, ResumePreview, SkillSection, StrengthSection } from "@/components";
import useResume from "@/hooks/useResume";
import { notFound } from "next/navigation";
import { useEffect } from "react";

export default function Resume({ id }: { id: string }) {
    const { resume, loading, error, fetch, reset } = useResume();

    useEffect(() => {
        fetch(id)
        return () => reset()
    }, [id])

    if (loading) return <Loading />
    if (error) return <p>Error:{JSON.stringify(error)}</p>
    if (!resume) notFound()

    return (
        <div className="flex gap-x-10">
            <div className="w-2/6">
                <FormPersonal resume={resume} />
                <EmploymentSection resume={resume} />
                <EducationSection resume={resume} />
                <SkillSection resume={resume} />
                <StrengthSection resume={resume} />
            </div>
            <div className="w-4/6">
                <ResumePreview />
            </div>
        </div> 
    )
}