"use client"

import ListStrengths from "./ListStrengths";
import FormStrength from "./FormStrength";
import { Resume } from "@prisma/client";
import { useEffect } from "react";
import { useStrength } from "@/hooks";
import Loading from "@/app/loading";
import { ExpandableWrapper } from "@/components/util";

export default function StrengthSection({ resume }: { resume: Resume }) {
    const { strengths, loading, fetch, reset } = useStrength();
    
    useEffect(() => {
        fetch(resume)
        return () => reset()
    }, [resume.id]);
    
    return (
        <div>
            <h1 className="text-xl pb-1 border-b font-semibold mb-1">Strengths</h1>
            <ExpandableWrapper open={!loading} initialMaxHeight="max-h-24">
                {loading ? <Loading /> : (
                    <>
                        <ListStrengths strengths={strengths} />
                        <FormStrength resumeId={resume.id} />
                    </>
                )}
            </ExpandableWrapper>
        </div>
    )
}