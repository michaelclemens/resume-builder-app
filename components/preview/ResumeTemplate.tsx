import { ResumeFull } from "@/lib/client/resume"
import { forwardRef, Ref } from "react"
import { TemplateDefault, TemplateCompact } from "./templates"
import { Template } from "@prisma/client";

const resumePrintFooterClass = 'resume-print-footer';

export default forwardRef(({ resume, template }: { resume: ResumeFull, template: Template|null }, ref: Ref<HTMLDivElement>) => {
    const ResumeTemplate = () => {
        // switch selected/stored template
        switch(template) {
            case Template.COMPACT:
                return <TemplateCompact resume={resume} />
            case Template.DEFAULT:
            default:
                // return <TemplateCompact resume={resume} />
                return <TemplateDefault resume={resume} />
        }
    }

    return (
        <div ref={ref} className="resume-print-preview">
            <ResumeTemplate />
            <div className={resumePrintFooterClass} />
        </div>
    )
})