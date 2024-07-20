"use client"

import ListEducations from "./ListEducations";
import FormEducation from "./FormEducation";
import { Resume } from "@prisma/client";
import Loading from "@/app/loading";
import { useEffect } from "react";
import useEducation from "@/hooks/useEducation";

export default function EducationSection({ resume }: { resume: Resume }) {
    const { educations, loading, error, fetch, reset } = useEducation();
    
    useEffect(() => {
        fetch(resume)
        return () => reset()
    }, [resume.id]);

    if (loading || !educations) return <Loading />
    if (error) return <p>Error: {error}</p>
    
    return (
        <div className="mb-5">
            <h1 className="text-xl pb-1 border-b font-semibold mb-1">Education</h1>
            <ListEducations educations={educations} />
            <FormEducation resumeId={resume.id} />
        </div>
    )
}