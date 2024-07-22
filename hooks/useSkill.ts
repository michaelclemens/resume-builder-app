import { addSkill, deleteSkill, setSortOrders, updateSkill } from "@/lib/client/skill";
import { fetchSkills, removeSkill, selectSkill, setSkill, clear, setSkills } from "@/lib/redux/reducers/skill";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { Skill } from "@prisma/client";

const useSkill = () => {
    const { skills, loading, error } = useAppSelector(selectSkill);
    const dispatch = useAppDispatch();

    const fetch = (resumeId: string) => dispatch(fetchSkills(resumeId))

    const set = (skills: Skill[]) => dispatch(setSkills(skills))
    
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

    const saveSortOrder = async(skills: Skill[]) => {
        set(skills);
        await setSortOrders(skills);
    }
    
    const reset = () => { dispatch(clear()) }

    return { skills, loading, error, fetch, set, save, remove, saveSortOrder, reset }
}

export default useSkill;