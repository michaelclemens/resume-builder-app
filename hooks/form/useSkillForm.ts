import { useAppDispatch } from "@/lib/redux/store";
import { ResponseStatus } from "@/lib/response";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { setSkill } from "@/lib/redux/reducers/skill";
import { SkillSchema, SkillSchemaType } from "@/types/form";
import { addSkill, updateSkill } from "@/lib/client/skill";
import { Skill } from "@prisma/client";

const useSkillForm = (skill?: Skill) => {
    const dispatch = useAppDispatch();
    const form = useForm<SkillSchemaType>({ resolver: zodResolver(SkillSchema), defaultValues: { name: skill?.name ?? '' }});
    
    const save = async(resumeId: string, formData: SkillSchemaType) => {
        const response = skill?.id ? await updateSkill(skill.id, resumeId, formData) : await addSkill(resumeId, formData);

        if (response.status === ResponseStatus.success) {
            dispatch(setSkill(response.payload.skill));
        }

        return response;
    }

    return { skill, save, ...form }
}

export default useSkillForm;