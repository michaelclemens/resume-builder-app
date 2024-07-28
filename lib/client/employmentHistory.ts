"use server"

import prisma from "@/lib/prisma";
import { EmploymentHistorySchema, EmploymentHistorySchemaType } from "@/types/form";
import { EmploymentHistory } from "@prisma/client";
import { sanitize } from "isomorphic-dompurify";
import { IResponse, response, ResponseStatus } from "../response";

type HistoryPayload = { history: EmploymentHistory }

const createDataPayload = (employmentId: string, formData: EmploymentHistorySchemaType) => {
    EmploymentHistorySchema.parse(formData);
    return {
        employmentId,
        ...formData,
        startDate: new Date(formData.startDate),
        endDate: formData.endDate ? new Date(formData.endDate) : undefined,
        description: formData.description && sanitize(formData.description) 
    }
}

export async function addEmploymentHistory(employmentId: string, formData: EmploymentHistorySchemaType): Promise<IResponse<HistoryPayload>> {
    try {
        const history = await prisma.employmentHistory.create({ data: createDataPayload(employmentId, formData) });
        return response<HistoryPayload>(ResponseStatus.success, { payload: { history }});
    } catch (error) {
        return response(ResponseStatus.error, { error });
    }
}

export async function updateEmploymentHistory(id: string, employmentId: string, formData: EmploymentHistorySchemaType): Promise<IResponse<HistoryPayload>> {
    try {
        const history = await prisma.employmentHistory.update({ where: { id }, data: createDataPayload(employmentId, formData) });
        return response<HistoryPayload>(ResponseStatus.success, { payload: { history }});
    } catch (error) {
        return response(ResponseStatus.error, { error });
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