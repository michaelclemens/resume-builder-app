import { clear as clearPersonal } from "@/lib/redux/reducers/personal";
import { clear as clearEmployments } from "@/lib/redux/reducers/employment";
import { clear as clearEducations } from "@/lib/redux/reducers/education";
import { clear as clearSkills } from "@/lib/redux/reducers/skill";
import { clear as clearStrengths } from "@/lib/redux/reducers/strength";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { Template } from "@prisma/client";
import { clear, selectResume, setResume, setTemplate, setTemplateOptions } from "@/lib/redux/reducers/resume";
import { useEffect } from "react";
import { ResumeFull, updateResume } from "@/lib/client/resume";
import { TemplateOptions } from "@/types/template";

export default function useResume(initialResume?: ResumeFull|null) {
    const { resume } = useAppSelector(selectResume);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (initialResume && !resume) {
            console.log('setting resume...');
            dispatch(setResume(initialResume));
        }
    }, [initialResume])

    const updateTemplate = async(resumeId: string, template: Template) => {
        await updateResume(resumeId, { template, templateOptions: {} });
        dispatch(setTemplateOptions({}));
        dispatch(setTemplate(template));
    }

    const updateTemplateOptions = async(resumeId: string, templateOptions: TemplateOptions) => {
        console.log(templateOptions);
        await updateResume(resumeId, { templateOptions });
        dispatch(setTemplateOptions(templateOptions));
    }
    
    const resetAllState = () => {
        dispatch(clear())
        dispatch(clearPersonal())
        dispatch(clearEmployments())
        dispatch(clearEducations())
        dispatch(clearSkills())
        dispatch(clearStrengths())
    }

    return { resume: resume ?? initialResume ?? null, updateTemplate, updateTemplateOptions, resetAllState }
}