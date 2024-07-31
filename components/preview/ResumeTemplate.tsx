import { ResumeFull } from "@/lib/client/resume"
import { forwardRef, Ref } from "react"
import TemplateDefault from "./templates/TemplateDefault"
import TemplateCompact from "./templates/TemplateCompact"

export default forwardRef(({ resume }: { resume: ResumeFull }, ref: Ref<HTMLInputElement>) => {
    const renderTemplate = () => {
        // switch selected/stored template
        switch(true) {
            default:
                return <TemplateCompact resume={resume} ref={ref} />
                return <TemplateDefault resume={resume} ref={ref} />
        }
    }

    return renderTemplate()
})