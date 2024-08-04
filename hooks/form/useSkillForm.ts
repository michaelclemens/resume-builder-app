"use client"

import { useAppDispatch } from "@/lib/redux/store";
import { handleErrorResponse, ResponseStatus } from "@/lib/response";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { setSkill } from "@/lib/redux/reducers/skill";
import { SkillSchema, SkillSchemaType } from "@/types/form";
import { addSkill, updateSkill } from "@/lib/client/skill";
import { Skill } from "@prisma/client";

export default function(skill?: Skill) {
    const dispatch = useAppDispatch();
    const form = useForm<SkillSchemaType>({ resolver: zodResolver(SkillSchema), defaultValues: { name: skill?.name ?? '' }});
    
    const editing = !!skill;

    const save = async(resumeId: string, formData: SkillSchemaType, onSave: () => void) => {
        const response = skill?.id ? await updateSkill(skill.id, resumeId, formData) : await addSkill(resumeId, formData);

        if (response.status === ResponseStatus.success) {
            dispatch(setSkill(response.payload.skill));
        }
        if (response.status === ResponseStatus.error) {
            return handleErrorResponse(response, form.setError);
        }
        onSave()
        if (!editing) form.reset();
    }

    return { skill, save, form, editing }
}