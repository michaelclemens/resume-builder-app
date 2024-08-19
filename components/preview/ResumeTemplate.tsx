import { Ref } from "react"
import { ResumeFull } from "@/lib/client/resume";
import { getTemplateComponent, resumePrintPreviewID } from "@/util/template";

const resumePrintFooterClass = 'resume-print-footer';

export default function ResumeTemplate(
    { resume, resumePreviewRef, colourElementRef }:
    { resume: ResumeFull, resumePreviewRef?: Ref<HTMLDivElement>, colourElementRef?: Ref<HTMLDivElement>}
) {
    const ResumeTemplateComponent = getTemplateComponent(resume.template);
    return ( 
        <div ref={resumePreviewRef} id={resumePrintPreviewID} className="relative w-[210mm]">
            <ResumeTemplateComponent resume={resume} colourElementRef={colourElementRef} />
            <div className={resumePrintFooterClass} />
        </div>
    )
}