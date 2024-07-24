"use server"

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";

export type ResumeWithPersonal = Prisma.ResumeGetPayload<{
    include: { personal: true }
}>

export type ResumeFull = Prisma.ResumeGetPayload<{
    include: { 
        personal: true,
        employments: { include: { history: true } },
        educations: true,
        skills: true,
        strengths: true, 
    }
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
        return await prisma.resume.findUniqueOrThrow({ where: { id }})
    } catch (error) {
        console.error(error);
    }
}

export async function getResumeFull(id: string) {
    return await prisma.resume.findUniqueOrThrow({ where: { id }, include: {
        personal: true,
        employments: { include: { history: true }},
        educations: true,
        skills: true,
        strengths: true
    }})
}

export async function getAllResumes() {
    try {
        return await prisma.resume.findMany({ take: 10, orderBy: { createdAt: 'asc' }})
    } catch (error) {
        console.error(error);
    }
}