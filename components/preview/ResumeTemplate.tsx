import { forwardRef, Ref } from "react"
import { TemplateDefault, TemplateCompact } from "./templates"
import { Template } from "@prisma/client";
import useResume from "@/hooks/useResume";
import { ColourElementType, TemplateOptions } from "@/types/template";
import Loading from "@/components/ui/Loading";
import { ResumeFull } from "@/lib/client/resume";

const resumePrintFooterClass = 'resume-print-footer';

export default forwardRef(({ resume: initialResume }: { resume: ResumeFull|null }, ref: Ref<HTMLDivElement>) => {
    const { resume, updateTemplateOptions } = useResume(initialResume);

    if (!resume) return <Loading />;
    
    const onColourChange = async(elementType: ColourElementType, colour: string) => {
        const templateOptions = resume.templateOptions as TemplateOptions;
        await updateTemplateOptions(resume.id, {...templateOptions, colours: {...templateOptions.colours, [elementType]: colour } })
    }

    const onResetToDefault = async() => {
        await updateTemplateOptions(resume.id, { colours: {}});
    }

    const ResumeTemplate = () => {
        switch(resume.template) {
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