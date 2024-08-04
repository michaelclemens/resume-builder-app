"use client"

import { deleteSkill, setSortOrders } from "@/lib/client/skill";
import { removeSkill, selectSkillList, setSkills } from "@/lib/redux/reducers/skill";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { Skill } from "@prisma/client";
import { useEffect } from "react";

const useSkillList = ({ initialItems: initialSkills }: { initialItems?: Skill[] } = {}) => {
    const skills = useAppSelector(selectSkillList);
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

    return { items: skills ? [...skills] : [...initialSkills ?? []], remove, saveSortOrder }
}

export default useSkillList;