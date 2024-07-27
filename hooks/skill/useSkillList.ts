import { deleteSkill, setSortOrders } from "@/lib/client/skill";
import { fetchSkills, removeSkill, selectSkill, setSkills } from "@/lib/redux/reducers/skill";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { Skill } from "@prisma/client";

const useSkillList = () => {
    const { skills, loading } = useAppSelector(selectSkill);
    const dispatch = useAppDispatch();

    const fetch = (resumeId: string) => {
        dispatch(fetchSkills(resumeId))
    }
    
    const remove = async(skill: Skill) => {
        await deleteSkill(skill.id);
        dispatch(removeSkill(skill.id))
    }

    const saveSortOrder = async(skills: Skill[]) => {
        dispatch(setSkills(skills));
        await setSortOrders(skills);
    }

    return { skills: skills && [...skills], loading, fetch, remove, saveSortOrder }
}

export default useSkillList;