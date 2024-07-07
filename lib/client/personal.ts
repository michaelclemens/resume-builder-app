"use server"

import prisma from "@/lib/prisma";

const createPersonalDataPayload = (resumeId: string, formData: FormData) => {
    return {
        resumeId, 
        position: formData.get('position') as string,
        firstName: formData.get('first_name') as string,
        lastName: formData.get('last_name') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
        city: formData.get('city') as string,
        country: formData.get('country') as string,
    }
}

export async function addPersonal(resumeId: string, formData: FormData) {
    try {
        await prisma.personal.create({ data: createPersonalDataPayload(resumeId, formData) });
    } catch (error) {
        console.error(error);
    }
}

export async function updatePersonal(id: string, resumeId: string, formData: FormData) {
    try {
        await prisma.personal.update({ where: { id }, data: createPersonalDataPayload(resumeId, formData) });
    } catch (error) {
        console.error(error);
    }
}