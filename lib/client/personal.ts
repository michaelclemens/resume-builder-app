"use server"

import prisma from "@/lib/prisma";

const createPersonalDataPayload = (resumeId: string, formData: FormData) => {
    return {
        resumeId, 
        firstName: formData.get('first_name') as string,
        lastName: formData.get('last_name') as string,
        position: formData.get('position') as string || null,
        summary: formData.get('summary') as string || null,
        email: formData.get('email') as string || null,
        phone: formData.get('phone') as string || null,
        city: formData.get('city') as string || null,
        country: formData.get('country') as string || null,
    }
}

export async function addPersonal(resumeId: string, formData: FormData) {
    try {
        return await prisma.personal.create({ data: createPersonalDataPayload(resumeId, formData) });
    } catch (error) {
        console.error(error);
    }
}

export async function updatePersonal(id: string, resumeId: string, formData: FormData) {
    try {
        return await prisma.personal.update({ where: { id }, data: createPersonalDataPayload(resumeId, formData) });
    } catch (error) {
        console.error(error);
    }
}