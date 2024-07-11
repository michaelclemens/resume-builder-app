"use server"

import prisma from "@/lib/prisma";
import { Strength } from "@prisma/client";

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

export async function setSortOrders(strengths: Strength[]) {
    try {
        strengths.forEach((strength) => {
            prisma.strength.update({ where: { id: strength.id }, data: { order: strength.order }})
        })
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