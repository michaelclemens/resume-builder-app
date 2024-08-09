"use server"

import prisma from "@/lib/prisma";
import { EducationSchema, EducationSchemaType } from "@/types/form";
import { Education } from "@prisma/client";
import { sanitize } from "isomorphic-dompurify";
import { response, ResponseStatus } from "../response";
import { SectionEnums } from "@/types/section";

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

export async function addEducation(resumeId: string, formData: EducationSchemaType) {
    try {
        const education = await prisma.education.create({ data: createDataPayload(resumeId, formData) });
        return response(ResponseStatus.success, { payload: { [SectionEnums.education]: education }});
    } catch (error) {
        return response(ResponseStatus.error, { error });
    }
}

export async function updateEducation(id: string, resumeId: string, formData: EducationSchemaType) {
    try {
        const education = await prisma.education.update({ where: { id }, data: createDataPayload(resumeId, formData) });
        return response(ResponseStatus.success, { payload: { [SectionEnums.education]: education }});
    } catch (error) {
        return response(ResponseStatus.error, { error });
    }
}

export async function setEducationSortOrders(educations: Education[]) {
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