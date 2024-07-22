"use client"

import ListStrengths from "./ListStrengths";
import FormStrength from "./FormStrength";
import { useEffect } from "react";
import { useStrength } from "@/hooks";
import Loading from "@/app/loading";
import { ExpandableWrapper } from "@/components/util";
import { Strength } from "@prisma/client";

export default function StrengthSection({ resumeId, strengths: initialStrengths }: { resumeId: string, strengths: Strength[] }) {
    const { strengths: stateStrengths, set } = useStrength();
    
    useEffect(() => {
        set(initialStrengths)
    }, [resumeId]);

    let strengths = stateStrengths ? [...stateStrengths] : initialStrengths;
    
    return (
        <div>
            <h1 className="text-xl pb-1 border-b font-semibold mb-1">Strengths</h1>
            <ExpandableWrapper open={!!strengths} initialMaxHeight="max-h-24">
                {!strengths ? <Loading /> : (
                    <>
                        <ListStrengths strengths={strengths} />
                        <FormStrength resumeId={resumeId} />
                    </>
                )}
            </ExpandableWrapper>
        </div>
    )
}