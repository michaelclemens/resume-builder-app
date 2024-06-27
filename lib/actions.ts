"use server"

import prisma from "@/lib/prisma";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function createResumeAction() {
    let resume = null;
    try {
        resume = await prisma.resume.create({ data: {} });  
    } catch (error) {
        console.error(error);
    }

    if (!resume?.id) { return }

    redirect(`/resume/${resume.id}`);
}

export async function getResume(id: string) {
    try {
        return await prisma.resume.findUniqueOrThrow({ where: { id }})
    } catch (error) {
        console.error(error);
        redirect('/');
    }
}

export async function getAllResumes() {
    try {
        return await prisma.resume.findMany({ take: 10, orderBy: { createdAt: 'asc' }})
    } catch (error) {
        console.error(error);
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
        await prisma.education.create({ data: {
            resumeId, 
            school: formData.get('school') as string,
            degree: formData.get('degree') as string,
            startDate: new Date(formData.get('start_date') as string),
            endDate: formData.get('end_date') ? new Date(formData.get('end_date') as string) : null,
            city: formData.get('city') as string || null,
            description: formData.get('description') as string || null
        }});
        revalidateTag('educations');
    } catch (error) {
        console.error(error);
    }
}