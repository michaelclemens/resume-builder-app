"use server"

import prisma from "@/lib/prisma";
import { revalidateTag } from "next/cache";

const createEmploymentDataPayload = (resumeId: string, formData: FormData) => {
    return {
        resumeId, 
        // school: formData.get('school') as string,
        // degree: formData.get('degree') as string,
        // startDate: new Date(formData.get('start_date') as string),
        // endDate: formData.get('end_date') ? new Date(formData.get('end_date') as string) : null,
        // city: formData.get('city') as string || null,
        // description: formData.get('description') as string || null
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