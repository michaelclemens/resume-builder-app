"use client"

import { deleteSkill, setSortOrders } from "@/lib/client/skill";
import { getSection, SectionEnums } from "@/lib/redux/reducers/sections";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { Skill } from "@prisma/client";
import { useEffect, useState } from "react";

const useSkillList = ({ initialItems: initialSkills }: { initialItems?: Skill[] } = {}) => {
    const { actions, selectors } = getSection(SectionEnums.skill);
    const skills = useAppSelector(selectors.selectItems);
    const dispatch = useAppDispatch();
    const [editing, setEditing] = useState(false);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        if (initialSkills && !skills) {
            console.log('setting skills...');
            dispatch(actions.setItems(initialSkills));
        }
    }, [initialSkills])
    
    const remove = async(skill: Skill) => {
        setDeleting(true);
        try {
            await deleteSkill(skill.id);
            dispatch(actions.removeItem(skill.id));
        } catch(error) {
            console.error(error);
        } finally {
            setDeleting(false);
        }
    }

    const saveSortOrder = async(skills: Skill[]) => {
        dispatch(actions.setItems(skills));
        await setSortOrders(skills);
    }

    return { items: skills ? [...skills] : [...initialSkills ?? []], remove, saveSortOrder, setEditing, editing, deleting }
}

export default useSkillList;