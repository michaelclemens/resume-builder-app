import { addSkill, deleteSkill, updateSkill } from "@/lib/client/skill";
import { fetchSkills, removeSkill, selectSkill, setSkill, clear } from "@/lib/redux/reducers/skill";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { Resume, Skill } from "@prisma/client";

const useSkill = () => {
    const { skills, loading, error } = useAppSelector(selectSkill);
    const dispatch = useAppDispatch();

    const fetch = (resume: Resume) => { dispatch(fetchSkills(resume)) }
    
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
    
    const reset = () => { dispatch(clear()) }

    return { skills, loading, error, fetch, save, remove, reset }
}

export default useSkill;