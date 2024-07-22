"use client"

import FormPersonal from "@/components/personal/FormPersonal";
import { usePersonal } from "@/hooks";
import { useEffect } from "react";
import { Personal } from "@prisma/client";

export default ({ resumeId, personal }: { resumeId: string, personal: Personal|null }) => {
    const { set } = usePersonal();
    
    useEffect(() => {
        set(personal)
    }, [resumeId]);

    return <FormPersonal resumeId={resumeId} personal={personal} />
}