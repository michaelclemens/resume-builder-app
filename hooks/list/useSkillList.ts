import { deleteSkill, setSortOrders } from "@/lib/client/skill";
import { removeSkill, selectSkill, setSkills } from "@/lib/redux/reducers/skill";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { Skill } from "@prisma/client";

const useSkillList = (initialSkills?: Skill[]) => {
    const { skills, loading } = useAppSelector(selectSkill);
    const dispatch = useAppDispatch();
    
    const remove = async(skill: Skill) => {
        await deleteSkill(skill.id);
        dispatch(removeSkill(skill.id))
    }

    const saveSortOrder = async(skills: Skill[]) => {
        dispatch(setSkills(skills));
        await setSortOrders(skills);
    }

    return { skills: skills ? [...skills] : initialSkills ?? [], loading, remove, saveSortOrder }
}

export default useSkillList;