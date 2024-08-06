"use server"

import prisma from "@/lib/prisma";
import { EducationSchema, EducationSchemaType } from "@/types/form";
import { Education } from "@prisma/client";
import { sanitize } from "isomorphic-dompurify";
import { IResponse, response, ResponseStatus } from "../response";

type EducationPayload = { education: Education }

const createDataPayload = (resumeId: string, formData: EducationSchemaType) => {
    EducationSchema.parse(formData);
    return { 
        resumeId, 
        ...formData, 
        startDate: new Date(formData.startDate),
        endDate: formData.endDate ? new Date(formData.endDate) : undefined,
        description: formData.description && sanitize(formData.description) 
    }
}

export async function getEducations(resumeId: string) {
    try {
        return await prisma.education.findMany({ where: { resumeId }});
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function addEducation(resumeId: string, formData: EducationSchemaType): Promise<IResponse<EducationPayload>> {
    try {
        const education = await prisma.education.create({ data: createDataPayload(resumeId, formData) });
        return response<EducationPayload>(ResponseStatus.success, { payload: { education }});
    } catch (error) {
        return response(ResponseStatus.error, { error });
    }
}

export async function updateEducation(id: string, resumeId: string, formData: EducationSchemaType): Promise<IResponse<EducationPayload>> {
    try {
        const education = await prisma.education.update({ where: { id }, data: createDataPayload(resumeId, formData) });
        return response<EducationPayload>(ResponseStatus.success, { payload: { education }});
    } catch (error) {
        return response(ResponseStatus.error, { error });
    }
}

export async function setSortOrders(educations: Education[]) {
    try {
        for (const education of educations) {
            await prisma.education.update({ where: { id: education.id }, data: { order: education.order }})
        }
    } catch (error) {
        console.error(error);
    }
}

export async function deleteEducation(id: string) {
    try {
        return await prisma.education.delete({ where: { id } });
    } catch (error) {
        console.error(error);
    }
}