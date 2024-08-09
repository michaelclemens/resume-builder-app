"use server"

import prisma from "@/lib/prisma";
import { EmploymentSchema, EmploymentSchemaType } from "@/types/form";
import { response, ResponseStatus } from "../response";
import { EmploymentWithHistory, SectionEnums } from "@/types/section";

const createDataPayload = (resumeId: string, formData: EmploymentSchemaType) => {
    EmploymentSchema.parse(formData);
    return { resumeId, ...formData }
}

export async function getEmployments(resumeId: string) {
    try {
        return await prisma.employment.findMany({ where: { resumeId }, include: { history: true }})
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function addEmployment(resumeId: string, formData: EmploymentSchemaType) {
    try {
        const employment = await prisma.employment.create({ data: createDataPayload(resumeId, formData) });
        return response(ResponseStatus.success, { payload: { [SectionEnums.employment]: employment }});
    } catch (error) {
        return response(ResponseStatus.error, { error });
    }
}

export async function updateEmployment(id: string, resumeId: string, formData: EmploymentSchemaType) {
    try {
        const employment = await prisma.employment.update({ where: { id }, data: createDataPayload(resumeId, formData) });
        return response(ResponseStatus.success, { payload: { [SectionEnums.employment]: employment }});
    } catch (error) {
        return response(ResponseStatus.error, { error });
    }
}

export async function setEmploymentSortOrders(employments: EmploymentWithHistory[]) {
    try {
        for (const employment of employments) {
            await prisma.employment.update({ where: { id: employment.id }, data: { order: employment.order }})
        }
    } catch (error) {
        console.error(error);
    }
}

export async function deleteEmployment(id: string) {
    try {
        return await prisma.employment.delete({ where: { id } });
    } catch (error) {
        console.error(error);
    }
}