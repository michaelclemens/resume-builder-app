"use client"

import { ResumeFull } from "@/lib/client/resume";
import { useEffect, useRef } from "react";
import { PrintButton, ResumeTemplate } from "@/components/preview";
import useResume from "@/hooks/useResume";
import TemplateSwitcher from "../preview/TemplateSwitcher";

const A4Heightpx = 1122;

export default function ResumePreview({ resume: initialResume }: { resume: ResumeFull }) {
    const { resetAllState } = useResume();
    const componentRef = useRef<HTMLDivElement|null>(null);

    const onBeforePrint = () => {
        const component = componentRef.current;
        const resumeHeight = component?.clientHeight;

        if (!resumeHeight) return

        const numberOfPages = Math.ceil(resumeHeight / A4Heightpx);
        if (numberOfPages > 1) {
            const newHeight = A4Heightpx * numberOfPages;
            component.style.setProperty('--print-height', `${newHeight}px`);
        }
    }

    useEffect(() => {
        return () => {
            console.log('unmounting...');
            resetAllState();
        }
    }, [])

    return (
        <div className="relative ml-14 my-10 w-[210mm] h-full text-black">
            <div className="pb-10">
                <ResumeTemplate resume={initialResume} ref={componentRef} />    
            </div>  
            <div className="absolute top-0 -right-24 text-center">
                <div className="fixed">
                    <PrintButton getContent={() => (componentRef.current)} onBeforePrint={onBeforePrint} />
                    <TemplateSwitcher resumeId={initialResume.id} />
                </div>
            </div>
        </div>
    )
}