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

    return (
        <div>
            <h1 className="text-xl pb-1 border-b font-semibold mb-1">Personal</h1>
            <FormPersonal resumeId={resumeId} personal={personal} />
        </div>
    )
}