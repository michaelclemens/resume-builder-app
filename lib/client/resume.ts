"use server"

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";

export type ResumeWithPersonal = Prisma.ResumeGetPayload<{
    include: { personal: true }
}>

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
        return await prisma.resume.findUniqueOrThrow({ where: { id }, include: { personal: true }})
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