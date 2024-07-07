"use server"

import prisma from "@/lib/prisma";
import { revalidateTag } from "next/cache";

const createEmploymentDataPayload = (resumeId: string, formData: FormData) => {
    return {
        resumeId, 
        employer: formData.get('employer') as string,
        city: formData.get('city') as string || null
    }
}

export async function getEmployments(resumeId: string) {
    try {
        return await prisma.employment.findMany({ where: { resumeId }})
    } catch (error) {
        console.error(error);
    }
}

export async function addEmploymentAction(resumeId: string, formData: FormData) {
    try {
        await prisma.employment.create({ data: createEmploymentDataPayload(resumeId, formData) });
        revalidateTag('employments');
    } catch (error) {
        console.error(error);
    }
}

export async function updateEmploymentAction(id: string, resumeId: string, formData: FormData) {
    try {
        await prisma.employment.update({ where: { id }, data: createEmploymentDataPayload(resumeId, formData) });
        revalidateTag('employments');
    } catch (error) {
        console.error(error);
    }
}

export async function deleteEmployment(id: string) {
    try {
        await prisma.employment.delete({ where: { id } });
        revalidateTag('employments');
    } catch (error) {
        console.error(error);
    }
}