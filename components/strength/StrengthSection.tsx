"use client"

import ListStrengths from "./ListStrengths";
import FormStrength from "./FormStrength";
import { useEffect } from "react";
import { useStrength } from "@/hooks";
import { Strength } from "@prisma/client";

export default function StrengthSection({ resumeId, strengths: initialStrengths }: { resumeId: string, strengths: Strength[] }) {
    const { strengths: stateStrengths, set } = useStrength();
    
    useEffect(() => {
        set(initialStrengths)
    }, [resumeId]);

    let strengths = stateStrengths ? [...stateStrengths] : initialStrengths;
    
    return (
        <>
            <ListStrengths strengths={strengths} />
            <FormStrength resumeId={resumeId} />
        </>
    )
}