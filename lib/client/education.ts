"use server"

import prisma from "@/lib/prisma";
import { revalidateTag } from "next/cache";

const createEducationDataPayload = (resumeId: string, formData: FormData) => {
    return {
        resumeId, 
        school: formData.get('school') as string,
        degree: formData.get('degree') as string,
        startDate: new Date(formData.get('start_date') as string),
        endDate: formData.get('end_date') ? new Date(formData.get('end_date') as string) : null,
        city: formData.get('city') as string || null,
        description: formData.get('description') as string || null
    }
}

export async function getEducations(resumeId: string) {
    try {
        return await prisma.education.findMany({ where: { resumeId }})
    } catch (error) {
        console.error(error);
    }
}

export async function addEducationAction(resumeId: string, formData: FormData) {
    try {
        await prisma.education.create({ data: createEducationDataPayload(resumeId, formData) });
        revalidateTag('educations');
    } catch (error) {
        console.error(error);
    }
}

export async function updateEducationAction(id: string, resumeId: string, formData: FormData) {
    try {
        await prisma.education.update({ where: { id }, data: createEducationDataPayload(resumeId, formData) });
        revalidateTag('educations');
    } catch (error) {
        console.error(error);
    }
}

export async function deleteEducation(id: string) {
    try {
        await prisma.education.delete({ where: { id } });
        revalidateTag('educations');
    } catch (error) {
        console.error(error);
    }
}