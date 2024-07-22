"use client"

import ListEducations from "./ListEducations";
import FormEducation from "./FormEducation";
import Loading from "@/app/loading";
import { useEffect } from "react";
import { useEducation } from "@/hooks";
import { ExpandableWrapper } from "@/components/util";
import { Education } from "@prisma/client";

export default function EducationSection({ resumeId, educations: initialEducations }: { resumeId: string, educations: Education[] }) {
    const { educations: stateEducations, set } = useEducation();
    
    useEffect(() => {
        set(initialEducations)
    }, [resumeId]);

    let educations = stateEducations ? [...stateEducations] : initialEducations;
    
    return (
        <div>
            <h1 className="text-xl pb-1 border-b font-semibold mb-1">Education</h1>
            <ExpandableWrapper open={!!educations} initialMaxHeight="max-h-24">
                {!educations ? <Loading /> : (
                    <>
                        <ListEducations educations={educations} />
                        <FormEducation resumeId={resumeId} />
                    </>
                )}
            </ExpandableWrapper>
        </div>
    )
}