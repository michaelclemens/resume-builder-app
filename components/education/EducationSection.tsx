"use client"

import ListEducations from "./ListEducations";
import FormEducation from "./FormEducation";
import Loading from "@/app/loading";
import { useEffect } from "react";
import { useEducation } from "@/hooks";
import { ExpandableWrapper } from "@/components/util";

export default function EducationSection({ resumeId }: { resumeId: string }) {
    const { educations, loading, fetch, reset } = useEducation();
    
    useEffect(() => {
        fetch(resumeId)
        return () => reset()
    }, [resumeId]);
    
    return (
        <div>
            <h1 className="text-xl pb-1 border-b font-semibold mb-1">Education</h1>
            <ExpandableWrapper open={!loading} initialMaxHeight="max-h-24">
                {loading ? <Loading /> : (
                    <>
                        <ListEducations educations={educations} />
                        <FormEducation resumeId={resumeId} />
                    </>
                )}
            </ExpandableWrapper>
        </div>
    )
}