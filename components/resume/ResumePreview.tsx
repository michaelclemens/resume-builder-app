"use client"

import { ResumeFull } from "@/lib/client/resume";
import { useEffect, useRef } from "react";
import { PrintButton, ResumeTemplate } from "@/components/preview";
import useResume from "@/hooks/useResume";

const A4Heightpx = 1122;

export default function ResumePreview({ resume }: { resume: ResumeFull }) {
    const componentRef = useRef<HTMLDivElement|null>(null);
    const { resetAllState } = useResume();

    const onBeforePrint = () => {
        const component = componentRef.current;
        const resumeHeight = component?.clientHeight;

        if (!resumeHeight) return
        
        const numberOfPages = Math.ceil(resumeHeight / A4Heightpx);
        if (numberOfPages > 1) {
            const newHeight = A4Heightpx * numberOfPages;
            component.classList.add(`print:h-[${newHeight}px]`);
        }
    }

    useEffect(() => {
        return () => {
            console.log('unmounting...');
            resetAllState();
        }
    }, [])

    return (
        <div className="relative mx-auto my-10 w-[210mm]">
            <PrintButton getContent={() => (componentRef.current)} onBeforePrint={onBeforePrint} />
            <ResumeTemplate resume={resume} ref={componentRef} />
        </div>
    )
}