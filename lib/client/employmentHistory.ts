"use server"

import prisma from "@/lib/prisma";
import { EmploymentHistorySchema, EmploymentHistorySchemaType } from "@/types/form";
import { EmploymentHistory } from "@prisma/client";
import { sanitize } from "isomorphic-dompurify";
import { response, ResponseStatus } from "../response";
import { SectionEnums } from "@/types/section";

const createDataPayload = (parentId: string, formData: EmploymentHistorySchemaType) => {
    EmploymentHistorySchema.parse(formData);
    return {
        employmentId: parentId,
        ...formData,
        startDate: new Date(formData.startDate),
        endDate: formData.endDate ? new Date(formData.endDate) : undefined,
        description: formData.description && sanitize(formData.description) 
    }
}

export async function addEmploymentHistory(parentId: string, formData: EmploymentHistorySchemaType) {
    try {
        const history = await prisma.employmentHistory.create({ data: createDataPayload(parentId, formData) });
        return response(ResponseStatus.success, { payload: { [SectionEnums.employmentHistory]: history }});
    } catch (error) {
        return response(ResponseStatus.error, { error });
    }
}

export async function updateEmploymentHistory(id: string, parentId: string, formData: EmploymentHistorySchemaType) {
    try {
        const history = await prisma.employmentHistory.update({ where: { id }, data: createDataPayload(parentId, formData) });
        return response(ResponseStatus.success, { payload: { [SectionEnums.employmentHistory]: history }});
    } catch (error) {
        return response(ResponseStatus.error, { error });
    }
}

export async function setEmploymentHistorySortOrders(items: EmploymentHistory[]) {
    try {
        for (const history of items) {
            await prisma.employmentHistory.update({ where: { id: history.id }, data: { order: history.order }})
        }
    } catch (error) {
        console.error(error);
    }
}

export async function deleteEmploymentHistory(id: string) {
    try {
        return await prisma.employmentHistory.delete({ where: { id } });
    } catch (error) {
        console.error(error);
    }
}