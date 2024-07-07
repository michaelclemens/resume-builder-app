"use server"

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { revalidateTag } from "next/cache";

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

const createEmploymentHistoryDataPayload = (employmentId: string, formData: FormData) => {
    return {
        employmentId, 
        title: formData.get('title') as string,
        startDate: new Date(formData.get('start_date') as string),
        endDate: formData.get('end_date') ? new Date(formData.get('end_date') as string) : null,
        description: formData.get('description') as string || null
    }
}

export async function addEmploymentHistoryAction(employmentId: string, formData: FormData) {
    try {
        await prisma.employmentHistory.create({ data: createEmploymentHistoryDataPayload(employmentId, formData) });
        revalidateTag('employmentHistory');
    } catch (error) {
        console.error(error);
    }
}

export async function updateEmploymentHistoryAction(id: string, employmentId: string, formData: FormData) {
    try {
        await prisma.employmentHistory.update({ where: { id }, data: createEmploymentHistoryDataPayload(employmentId, formData) });
        revalidateTag('employmentHistory');
    } catch (error) {
        console.error(error);
    }
}

export async function deleteEmploymentHistory(id: string) {
    try {
        await prisma.employmentHistory.delete({ where: { id } });
        revalidateTag('employmentHistory');
    } catch (error) {
        console.error(error);
    }
}