"use client"

import { ResumeFull } from "@/lib/client/resume";
import { useEffect, useRef } from "react";
import { TemplateSwitcher } from "@/components/ui";
import ResumeTemplate from "./ResumeTemplate";
import useResumePreview from "@/hooks/useResumePreview";
import ResumePrintButton from "./ResumePrintButton";
import ResumeDownloadButton from "./ResumeDownloadButton";
import ResumeColourPicker from "./ResumeColourPicker";

export default function ResumePreview({ resume: initialResume }: { resume: ResumeFull }) {
    const { resume, resetAllState } = useResumePreview(initialResume);
    const resumePreviewRef = useRef<HTMLDivElement|null>(null);
    const colourElementRef = useRef<HTMLDivElement|null>(null);

    useEffect(() => {
        return () => {
            console.log('unmounting...');
            resetAllState();
        }
    }, [resetAllState])

    return (
        <div className="relative ml-1 my-3 flex flex-shrink">
            <div className="relative z-40 px-12 py-10 flex flex-shrink backdrop-blur-sm shadow-md rounded-lg ring-1 ring-slate-300/60 dark:ring-slate-400/20">
                <ResumeTemplate
                    // @ts-ignore
                    resume={resume} 
                    resumePreviewRef={resumePreviewRef} 
                    colourElementRef={colourElementRef}
                />
                <ResumeColourPicker resume={resume} colourElementRef={colourElementRef} />
            </div>
            <div className="flex justify-center text-center w-full mt-5">
                <div className="fixed">
                    <ResumePrintButton resumePreviewRef={resumePreviewRef} />
                    <ResumeDownloadButton resumeId={resume.id} />
                    <TemplateSwitcher resumeId={resume.id} template={resume.template} />
                </div>
            </div> 
        </div>
    )
}