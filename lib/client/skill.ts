"use server"

import prisma from "@/lib/prisma";
import { Skill } from "@prisma/client";

const createSkillDataPayload = (resumeId: string, formData: FormData) => {
    return {
        resumeId, 
        name: formData.get('name') as string,
    }
}

export async function getSkills(resumeId: string) {
    try {
        return await prisma.skill.findMany({ where: { resumeId }})
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function addSkill(resumeId: string, formData: FormData) {
    try {
        return await prisma.skill.create({ data: createSkillDataPayload(resumeId, formData) });
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function updateSkill(id: string, resumeId: string, formData: FormData) {
    try {
        return await prisma.skill.update({ where: { id }, data: createSkillDataPayload(resumeId, formData) });
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function setSortOrders(skills: Skill[]) {
    try {
        skills.forEach(async(skill) => {
            await prisma.skill.update({ where: { id: skill.id }, data: { order: skill.order }})
        })
    } catch (error) {
        console.error(error);
    }
}

export async function deleteSkill(id: string) {
    try {
        await prisma.skill.delete({ where: { id } });
    } catch (error) {
        console.error(error);
    }
}