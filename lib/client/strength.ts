"use server"

import prisma from "@/lib/prisma";

const createStrengthDataPayload = (resumeId: string, formData: FormData) => {
    return {
        resumeId, 
        name: formData.get('name') as string,
    }
}

export async function getStrengths(resumeId: string) {
    try {
        return await prisma.strength.findMany({ where: { resumeId }})
    } catch (error) {
        console.error(error);
    }
}

export async function addStrength(resumeId: string, formData: FormData) {
    try {
        return await prisma.strength.create({ data: createStrengthDataPayload(resumeId, formData) });
    } catch (error) {
        console.error(error);
    }
}

export async function updateStrength(id: string, resumeId: string, formData: FormData) {
    try {
        return await prisma.strength.update({ where: { id }, data: createStrengthDataPayload(resumeId, formData) });
    } catch (error) {
        console.error(error);
    }
}

export async function deleteStrength(id: string) {
    try {
        await prisma.strength.delete({ where: { id } });
    } catch (error) {
        console.error(error);
    }
}