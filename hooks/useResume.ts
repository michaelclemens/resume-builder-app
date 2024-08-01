import { clear as clearPersonal } from "@/lib/redux/reducers/personal";
import { clear as clearEmployments } from "@/lib/redux/reducers/employment";
import { clear as clearEducations } from "@/lib/redux/reducers/education";
import { clear as clearSkills } from "@/lib/redux/reducers/skill";
import { clear as clearStrengths } from "@/lib/redux/reducers/strength";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { Resume, Template } from "@prisma/client";
import { clear, selectResume, setResume, setTemplate } from "@/lib/redux/reducers/resume";
import { useEffect } from "react";
import { updateResumeTemplate } from "@/lib/client/resume";

export default function useResume(initialResume?: Resume|null) {
    const { resume } = useAppSelector(selectResume);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (initialResume && !resume) {
            console.log('setting resume...');
            dispatch(setResume(initialResume));
        }
    }, [initialResume])

    const updateTemplate = async(resumeId: string, template: Template) => {
        await updateResumeTemplate(resumeId, template);
        dispatch(setTemplate(template));
    }
    
    const resetAllState = () => {
        dispatch(clear())
        dispatch(clearPersonal())
        dispatch(clearEmployments())
        dispatch(clearEducations())
        dispatch(clearSkills())
        dispatch(clearStrengths())
    }

    return { resume: resume ?? initialResume ?? null, resetAllState, updateTemplate }
}