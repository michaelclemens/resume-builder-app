"use client"

import { useAppDispatch } from "@/lib/redux/store";
import { handleErrorResponse, ResponseStatus } from "@/lib/response";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SkillSchema, SkillSchemaType } from "@/types/form";
import { addSkill, updateSkill } from "@/lib/client/skill";
import { Skill } from "@prisma/client";
import { getDefaultValuesSkill } from "@/util/form";
import { getSection, SectionEnums } from "@/lib/redux/reducers/sections";

export default function(skill?: Skill) {
    const { actions } = getSection(SectionEnums.skill);
    const dispatch = useAppDispatch();
    const form = useForm<SkillSchemaType>({ 
        resolver: zodResolver(SkillSchema), 
        defaultValues: getDefaultValuesSkill(skill)
    });
    
    const editing = !!skill;

    const save = async(resumeId: string, formData: SkillSchemaType, onSave: () => void) => {
        const response = skill?.id ? await updateSkill(skill.id, resumeId, formData) : await addSkill(resumeId, formData);

        if (response.status === ResponseStatus.success) {
            dispatch(actions.setItem(response.payload.skill));
        }
        if (response.status === ResponseStatus.error) {
            return handleErrorResponse(response, form.setError);
        }
        onSave()
        if (!editing) form.reset();
    }

    return { save, form, editing }
}