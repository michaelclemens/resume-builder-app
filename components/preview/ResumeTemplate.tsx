import { ResumeFull } from "@/lib/client/resume"
import { forwardRef, Ref } from "react"
import TemplateDefault from "./templates/TemplateDefault"
import TemplateCompact from "./templates/TemplateCompact"

const resumePrintFooterClass = 'resume-print-footer';

export default forwardRef(({ resume }: { resume: ResumeFull }, ref: Ref<HTMLDivElement>) => {
    const Template = () => {
        // switch selected/stored template
        switch(true) {
            default:
                // return <TemplateCompact resume={resume} />
                return <TemplateDefault resume={resume} />
        }
    }

    return (
        <div ref={ref}>
            <Template />
            <div className={resumePrintFooterClass} />
        </div>
    )
})