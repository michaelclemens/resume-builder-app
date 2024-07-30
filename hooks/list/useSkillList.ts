import { deleteSkill, setSortOrders } from "@/lib/client/skill";
import { removeSkill, selectSkill, setSkills } from "@/lib/redux/reducers/skill";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { Skill } from "@prisma/client";
import { useEffect } from "react";

const useSkillList = (initialSkills?: Skill[]) => {
    const { skills, loading } = useAppSelector(selectSkill);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (initialSkills && !skills) {
            console.log('setting skills...');
            dispatch(setSkills(initialSkills));
        }
    }, [initialSkills])
    
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