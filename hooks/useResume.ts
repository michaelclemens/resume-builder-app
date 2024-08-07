"use client"

import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { Template } from "@prisma/client";
import { clear, selectResume, setResume, setTemplate, setTemplateOptions } from "@/lib/redux/reducers/resume";
import { useEffect } from "react";
import { ResumeFull, updateResume } from "@/lib/client/resume";
import { TemplateOptions } from "@/types/template";
import { getSection } from "@/util/section";
import { SectionEnums } from "@/types/section";

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
        await updateResume(resumeId, { templateOptions });
        dispatch(setTemplateOptions(templateOptions));
    }
    
    const resetAllState = () => {
        dispatch(clear())
        dispatch(getSection(SectionEnums.personal).state.actions.clear())
        dispatch(getSection(SectionEnums.education).state.actions.clear())
        dispatch(getSection(SectionEnums.employment).state.actions.clear())
        dispatch(getSection(SectionEnums.skill).state.actions.clear())
        dispatch(getSection(SectionEnums.strength).state.actions.clear())
    }

    return { resume: resume ?? initialResume ?? null, updateTemplate, updateTemplateOptions, resetAllState }
}