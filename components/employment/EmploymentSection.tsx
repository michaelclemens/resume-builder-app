"use client"

import ListEmployments from "./ListEmployments";
import FormEmployment from "./FormEmployment";
import { useEmployment } from "@/hooks";
import { useEffect } from "react";
import { EmploymentWithHistory } from "@/lib/client/employment";

export default function EmploymentSection({ resumeId, employments: initialEmployments }: { resumeId: string, employments: EmploymentWithHistory[] }) {
    const { employments: stateEmployments, set } = useEmployment();
    
    useEffect(() => {
        set(initialEmployments)
    }, [resumeId]);

    let employments = stateEmployments ? [...stateEmployments] : initialEmployments;

    return (
        <>
            <ListEmployments employments={employments} />
            <FormEmployment resumeId={resumeId} />
        </>
    )
}