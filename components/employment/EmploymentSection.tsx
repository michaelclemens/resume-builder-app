"use client"

import ListEmployments from "./ListEmployments";
import FormEmployment from "./FormEmployment";
import { useEmployment } from "@/hooks";
import { useEffect } from "react";
import Loading from "@/app/loading";
import { ExpandableWrapper } from "@/components/util";
import { EmploymentWithHistory } from "@/lib/client/employment";

export default function EmploymentSection({ resumeId, employments: initialEmployments }: { resumeId: string, employments: EmploymentWithHistory[] }) {
    const { employments: stateEmployments, set } = useEmployment();
    
    useEffect(() => {
        set(initialEmployments)
    }, [resumeId]);

    let employments = stateEmployments ? [...stateEmployments] : initialEmployments;

    return (
        <div>
            <h1 className="text-xl pb-1 border-b font-semibold mb-1">Employments</h1>
            <ExpandableWrapper open={!!employments} initialMaxHeight="max-h-24">
                {!employments ? <Loading /> : (
                    <>
                        <ListEmployments employments={employments} />
                        <FormEmployment resumeId={resumeId} />
                    </>
                )}
            </ExpandableWrapper>
        </div>
    )
}