"use server"

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export type EmploymentWithHistory = Prisma.EmploymentGetPayload<{
    include: { history: true }
}>

const createEmploymentDataPayload = (resumeId: string, formData: FormData) => {
    return {
        resumeId, 
        employer: formData.get('employer') as string,
        city: formData.get('city') as string || null
    }
}

export async function getEmployments(resumeId: string) {
    try {
        return await prisma.employment.findMany({ where: { resumeId }, include: { history: true }})
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function addEmployment(resumeId: string, formData: FormData) {
    try {
        return await prisma.employment.create({ data: createEmploymentDataPayload(resumeId, formData) });
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function updateEmployment(id: string, resumeId: string, formData: FormData) {
    try {
        return await prisma.employment.update({ where: { id }, data: createEmploymentDataPayload(resumeId, formData) });
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function setSortOrders(employments: EmploymentWithHistory[]) {
    try {
        employments.forEach(async(employment) => {
            await prisma.employment.update({ where: { id: employment.id }, data: { order: employment.order }})
        })
    } catch (error) {
        console.error(error);
    }
}

export async function deleteEmployment(id: string) {
    try {
        await prisma.employment.delete({ where: { id } });
    } catch (error) {
        console.error(error);
    }
}