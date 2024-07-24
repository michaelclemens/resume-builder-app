import { ResumeFull } from "@/lib/client/resume"
import { forwardRef, Ref } from "react"
import TemplateDefault from "./templates/TemplateDefault"

export default forwardRef(({ resume }: { resume: ResumeFull }, ref: Ref<HTMLInputElement>) => {
    const renderTemplate = () => {
        // switch selected/stored template
        switch(true) {
            default:
                return <TemplateDefault resume={resume} />
        }
    }

    return (
        <div ref={ref}>
            {renderTemplate()}
        </div>
    )
})