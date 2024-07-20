"use client"

import ListStrengths from "./ListStrengths";
import FormStrength from "./FormStrength";
import { Resume } from "@prisma/client";
import { useEffect } from "react";
import useStrength from "@/hooks/useStrength";
import Loading from "@/app/loading";

export default function StrengthSection({ resume }: { resume: Resume }) {
    const { strengths, loading, fetch, reset } = useStrength();
    
    useEffect(() => {
        fetch(resume)
        return () => reset()
    }, [resume.id]);
    
    return (
        <div>
            <h1 className="text-xl pb-1 border-b font-semibold mb-1">Strengths</h1>
            <div className={`mb-3 transition-max-height ease-in duration-500 overflow-hidden ${loading ? 'max-h-24' : 'max-h-full'}`}>
                {loading ? <Loading /> : (
                    <>
                        <ListStrengths strengths={strengths} />
                        <FormStrength resumeId={resume.id} />
                    </>
                )}
            </div>
        </div>
    )
}