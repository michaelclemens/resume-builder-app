"use server"

import prisma from "@/lib/prisma";
import { EmploymentSchema, EmploymentSchemaType } from "@/types/employment";
import { Prisma } from "@prisma/client";
import { IResponse, response, ResponseStatus } from "../response";

export type EmploymentWithHistory = Prisma.EmploymentGetPayload<{
    include: { history: true }
}>

type EmploymentPayload = { employment: EmploymentWithHistory }

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

export async function addEmployment(resumeId: string, formData: EmploymentSchemaType): Promise<IResponse<EmploymentPayload>> {
    try {
        const employment = await prisma.employment.create({ data: createDataPayload(resumeId, formData), include: { history: true }});
        return response<EmploymentPayload>(ResponseStatus.success, { payload: { employment }});
    } catch (error) {
        return response(ResponseStatus.error, { error });
    }
}

export async function updateEmployment(id: string, resumeId: string, formData: EmploymentSchemaType): Promise<IResponse<EmploymentPayload>> {
    try {
        const employment = await prisma.employment.update({ where: { id }, data: createDataPayload(resumeId, formData), include: { history: true }});
        return response<EmploymentPayload>(ResponseStatus.success, { payload: { employment }});
    } catch (error) {
        return response(ResponseStatus.error, { error });
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