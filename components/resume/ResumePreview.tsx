"use client"

import { ResumeFull } from "@/lib/client/resume";
import { useRef } from "react";
import { PrintButton, ResumeTemplate } from "@/components/preview";

export default function ResumePreview({ resume }: { resume: ResumeFull }) {
    const componentRef = useRef(null);

    return (
        <div className="relative mx-auto my-10 w-[210mm]">
            <PrintButton content={() => componentRef.current} />
            <ResumeTemplate resume={resume} ref={componentRef}/>
        </div>
    )
}