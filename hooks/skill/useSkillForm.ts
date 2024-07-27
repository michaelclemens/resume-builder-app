import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { ResponseStatus } from "@/lib/response";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { selectSkillById, setSkill } from "@/lib/redux/reducers/skill";
import { SkillSchema, SkillSchemaType } from "@/types/skill";
import { addSkill, updateSkill } from "@/lib/client/skill";

const useSkillForm = (skillId?: string) => {
    const skill = skillId ? useAppSelector(state => selectSkillById(state, skillId)) : null;
    const form = useForm<SkillSchemaType>({
        resolver: zodResolver(SkillSchema),
        defaultValues: { name: skill?.name }
    });
    const dispatch = useAppDispatch();
    
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