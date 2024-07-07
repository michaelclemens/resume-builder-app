"use server"

import prisma from "@/lib/prisma";
import { revalidateTag } from "next/cache";

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
    }
}

export async function addSkill(resumeId: string, formData: FormData) {
    try {
        await prisma.skill.create({ data: createSkillDataPayload(resumeId, formData) });
        revalidateTag('skills');
    } catch (error) {
        console.error(error);
    }
}

export async function updateSkill(id: string, resumeId: string, formData: FormData) {
    try {
        await prisma.skill.update({ where: { id }, data: createSkillDataPayload(resumeId, formData) });
        revalidateTag('skills');
    } catch (error) {
        console.error(error);
    }
}

export async function deleteSkill(id: string) {
    try {
        await prisma.skill.delete({ where: { id } });
        revalidateTag('skills');
    } catch (error) {
        console.error(error);
    }
}