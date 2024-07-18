"use server"

import prisma from "@/lib/prisma";
import { EmploymentHistory } from "@prisma/client";
import { sanitize } from "isomorphic-dompurify";

const createEmploymentHistoryDataPayload = (employmentId: string, formData: FormData) => {
    return {
        employmentId, 
        title: formData.get('title') as string,
        startDate: new Date(formData.get('start_date') as string),
        endDate: formData.get('end_date') ? new Date(formData.get('end_date') as string) : null,
        description: sanitize(formData.get('description') as string) || null
    }
}

export async function addEmploymentHistory(employmentId: string, formData: FormData) {
    try {
        return await prisma.employmentHistory.create({ data: createEmploymentHistoryDataPayload(employmentId, formData) });
    } catch (error) {
        console.error(error);
    }
}

export async function updateEmploymentHistory(id: string, employmentId: string, formData: FormData) {
    try {
        return await prisma.employmentHistory.update({ where: { id }, data: createEmploymentHistoryDataPayload(employmentId, formData) });
    } catch (error) {
        console.error(error);
    }
}

export async function setSortOrders(histories: EmploymentHistory[]) {
    try {
        histories.forEach(async(history) => {
            await prisma.employmentHistory.update({ where: { id: history.id }, data: { order: history.order }})
        })
    } catch (error) {
        console.error(error);
    }
}

export async function deleteEmploymentHistory(id: string) {
    try {
        await prisma.employmentHistory.delete({ where: { id } });
    } catch (error) {
        console.error(error);
    }
}