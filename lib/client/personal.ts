"use server"

import prisma from "@/lib/prisma";
import { PersonalSchema, PersonalSchemaType } from "@/types/form";
import { Personal } from "@prisma/client";
import { sanitize } from "isomorphic-dompurify";
import { response, ResponseStatus } from "../response";
import { SectionEnums } from "@/types/section";

const createDataPayload = (parentId: string, formData: PersonalSchemaType) => {
    PersonalSchema.parse(formData);
    return {
        resumeId: parentId,
        ...formData,
        summary: formData.summary && sanitize(formData.summary)
    }
}

export async function getPersonal(resumeId: string): Promise<Personal|null> {
    try {
        return await prisma.personal.findUnique({ where: { resumeId }});
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function addPersonal(parentId: string, formData: PersonalSchemaType) {
    try {
        const personal = await prisma.personal.create({ data: createDataPayload(parentId, formData) });
        return response(ResponseStatus.success, { payload: { [SectionEnums.personal]: personal }});
    } catch (error) {
        return response(ResponseStatus.error, { error });
    }
}

export async function updatePersonal(id: string, parentId: string, formData: PersonalSchemaType) {
    try {
        const personal = await prisma.personal.update({ where: { id }, data: createDataPayload(parentId, formData) });
        return response(ResponseStatus.success, { payload: { [SectionEnums.personal]: personal }});
    } catch (error) {
        return response(ResponseStatus.error, { error });
    }
}