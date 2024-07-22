"use client"

import ListEmployments from "./ListEmployments";
import FormEmployment from "./FormEmployment";
import { useEmployment } from "@/hooks";
import { useEffect } from "react";
import Loading from "@/app/loading";
import { ExpandableWrapper } from "@/components/util";

export default function EmploymentSection({ resumeId }: { resumeId: string }) {
    const { employments, loading, fetch, reset } = useEmployment();
    
    useEffect(() => {
        fetch(resumeId)
        return () => reset()
    }, [resumeId]);

    return (
        <div>
            <h1 className="text-xl pb-1 border-b font-semibold mb-1">Employments</h1>
            <ExpandableWrapper open={!loading} initialMaxHeight="max-h-24">
                {loading ? <Loading /> : (
                    <>
                        <ListEmployments employments={employments} />
                        <FormEmployment resumeId={resumeId} />
                    </>
                )}
            </ExpandableWrapper>
        </div>
    )
}