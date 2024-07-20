"use client"

import ListEmployments from "./ListEmployments";
import FormEmployment from "./FormEmployment";
import { Resume } from "@prisma/client";
import useEmployment from "@/hooks/useEmployment";
import { useEffect } from "react";
import Loading from "@/app/loading";

export default function EmploymentSection({ resume }: { resume: Resume }) {
    const { employments, loading, fetch, reset } = useEmployment();
    
    useEffect(() => {
        fetch(resume)
        return () => reset()
    }, [resume.id]);

    return (
        <div>
            <h1 className="text-xl pb-1 border-b font-semibold mb-1">Employments</h1>
            <div className={`mb-3 transition-max-height ease-in duration-500 overflow-hidden ${loading ? 'max-h-24' : 'max-h-full'}`}>
                {loading ? <Loading /> : (
                    <>
                        <ListEmployments employments={employments} />
                        <FormEmployment resumeId={resume.id} />
                    </>
                )}
            </div>
        </div>
    )
}