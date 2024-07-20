"use client"

import ListEducations from "./ListEducations";
import FormEducation from "./FormEducation";
import { Resume } from "@prisma/client";
import Loading from "@/app/loading";
import { useEffect } from "react";
import useEducation from "@/hooks/useEducation";

export default function EducationSection({ resume }: { resume: Resume }) {
    const { educations, loading, fetch, reset } = useEducation();
    
    useEffect(() => {
        fetch(resume)
        return () => reset()
    }, [resume.id]);
    
    return (
        <div>
            <h1 className="text-xl pb-1 border-b font-semibold mb-1">Education</h1>
            <div className={`transition-max-height ease-in duration-500 overflow-hidden ${loading ? 'max-h-24' : 'max-h-full'}`}>
                {loading ? <Loading /> : (
                    <>
                        <ListEducations educations={educations} />
                        <FormEducation resumeId={resume.id} />
                    </>
                )}
            </div>
        </div>
    )
}