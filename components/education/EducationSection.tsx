"use client"

import ListEducations from "./ListEducations";
import FormEducation from "./FormEducation";
import { useEffect } from "react";
import { useEducation } from "@/hooks";
import { Education } from "@prisma/client";

export default function EducationSection({ resumeId, educations: initialEducations }: { resumeId: string, educations: Education[] }) {
    const { educations: stateEducations, set } = useEducation();
    
    useEffect(() => {
        set(initialEducations)
    }, [resumeId]);

    let educations = stateEducations ? [...stateEducations] : initialEducations;
    
    return (
        <>
            <ListEducations educations={educations} />
            <FormEducation resumeId={resumeId} />
        </>
    )
}