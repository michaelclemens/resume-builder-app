"use client"

import { deleteSkill, setSortOrders } from "@/lib/client/skill";
import { removeSkill, selectSkillList, setSkills } from "@/lib/redux/reducers/skill";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { Skill } from "@prisma/client";
import { useEffect, useState } from "react";

const useSkillList = ({ initialItems: initialSkills }: { initialItems?: Skill[] } = {}) => {
    const skills = useAppSelector(selectSkillList);
    const dispatch = useAppDispatch();
    const [editing, setEditing] = useState(false);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        if (initialSkills && !skills) {
            console.log('setting skills...');
            dispatch(setSkills(initialSkills));
        }
    }, [initialSkills])
    
    const remove = async(skill: Skill) => {
        setDeleting(true);
        try {
            await deleteSkill(skill.id);
            dispatch(removeSkill(skill.id));
        } catch(error) {
            console.error(error);
        } finally {
            setDeleting(false);
        }
    }

    const saveSortOrder = async(skills: Skill[]) => {
        dispatch(setSkills(skills));
        await setSortOrders(skills);
    }

    return { items: skills ? [...skills] : [...initialSkills ?? []], remove, saveSortOrder, setEditing, editing, deleting }
}

export default useSkillList;