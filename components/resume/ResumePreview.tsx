"use client"

import { ResumeFull } from "@/lib/client/resume";
import { useEffect, useRef } from "react";
import { PrintButton, ResumeTemplate } from "@/components/preview";
import useResume from "@/hooks/useResume";
import TemplateSwitcher from "../preview/TemplateSwitcher";
import { Resume } from "@prisma/client";

const A4Heightpx = 1122;

const getResumeFromFull = (resumeFull: ResumeFull): Resume|null => {
    if (!resumeFull) return null;

    return {
        id: resumeFull.id,
        template: resumeFull.template,
        templateOptions: resumeFull.templateOptions,
        createdAt: resumeFull.createdAt,
        updatedAt: resumeFull.updatedAt,
    }
}

export default function ResumePreview({ resume: resumeFull }: { resume: ResumeFull }) {
    const { resume, resetAllState } = useResume(resumeFull);
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
        <div className="relative ml-14 my-10 w-[210mm]">
            <ResumeTemplate template={resume?.template ?? null} ref={componentRef} />

            <div className="absolute top-0 -right-36">
                <div className="fixed">
                    <PrintButton getContent={() => (componentRef.current)} onBeforePrint={onBeforePrint} />
                    <TemplateSwitcher resumeId={resumeFull.id} />
                </div>
            </div>
        </div>
    )
}