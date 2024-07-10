import { addSkill, deleteSkill, updateSkill } from "@/lib/client/skill";
import { removeSkill, setSkill } from "@/lib/redux/reducers/resume";
import { useAppDispatch } from "@/lib/redux/store";
import { Skill } from "@prisma/client";

const useSkill = () => {
    const dispatch = useAppDispatch();
    
    const save = async(resumeId: string, formData: FormData, skillId?: string) => {
        let skill = null;
        if (skillId) {
            skill = await updateSkill(skillId, resumeId, formData);
        } else {
            skill = await addSkill(resumeId, formData);
        }

        dispatch(setSkill(skill))
    }

    const remove = async(skill: Skill) => {
        await deleteSkill(skill.id);
        dispatch(removeSkill(skill.id))
    }

    return { save, remove }
}

export default useSkill;