"use client"

import { ResumeFull } from "@/lib/client/resume";
import { useEffect, useRef } from "react";
import { PrintButton, ResumeTemplate } from "@/components/preview";
import useResume from "@/hooks/useResume";

export default function ResumePreview({ resume }: { resume: ResumeFull }) {
    const componentRef = useRef(null);
    const { resetAllState } = useResume();

    useEffect(() => {
        return () => {
            console.log('unmounting...');
            resetAllState();
        }
    }, [])

    return (
        <div className="relative mx-auto my-10 w-[210mm]">
            <PrintButton content={() => componentRef.current} />
            <ResumeTemplate resume={resume} ref={componentRef}/>
        </div>
    )
}