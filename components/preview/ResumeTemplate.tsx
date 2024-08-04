import { forwardRef, Ref } from "react"
import { TemplateDefault, TemplateCompact } from "./templates"
import { Template } from "@prisma/client";
import useResume from "@/hooks/useResume";
import { ColourElementType, TemplateOptions } from "@/types/template";

const resumePrintFooterClass = 'resume-print-footer';

export default forwardRef(({ template }: { template: Template|null }, ref: Ref<HTMLDivElement>) => {
    const { resume, updateTemplateOptions } = useResume();

    if (!resume) return;
    
    const onColourChange = async(elementType: ColourElementType, colour: string) => {
        await updateTemplateOptions(resume.id, {...resume.templateOptions as TemplateOptions, colours: { [elementType]: colour } })
    }

    const onResetToDefault = async() => {
        await updateTemplateOptions(resume.id, { colours: {}});
    }

    const ResumeTemplate = () => {
        switch(template) {
            case Template.COMPACT:
                return <TemplateCompact resume={resume} onColourChange={onColourChange} onResetToDefault={onResetToDefault} />
            case Template.DEFAULT:
            default:
                return <TemplateDefault resume={resume} onColourChange={onColourChange} onResetToDefault={onResetToDefault} />
        }
    }

    return (
        <div ref={ref} className="resume-print-preview">
            <ResumeTemplate />
            <div className={resumePrintFooterClass} />
        </div>
    )
})