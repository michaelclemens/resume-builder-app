"use server"

import prisma from "@/lib/prisma";
import { PersonalSchema, PersonalSchemaType } from "@/types/form";
import { Personal } from "@prisma/client";
import { sanitize } from "isomorphic-dompurify";
import { IResponse, response, ResponseStatus } from "../response";
import { SectionEnums } from "@/types/section";

type PersonalPayload = { [SectionEnums.personal]: Personal }

const createDataPayload = (resumeId: string, formData: PersonalSchemaType) => {
    PersonalSchema.parse(formData);
    return {
        resumeId,
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

export async function addPersonal(resumeId: string, formData: PersonalSchemaType): Promise<IResponse<PersonalPayload>> {
    try {
        const personal = await prisma.personal.create({ data: createDataPayload(resumeId, formData) });
        return response<PersonalPayload>(ResponseStatus.success, { payload: { [SectionEnums.personal]: personal }});
    } catch (error) {
        return response(ResponseStatus.error, { error });
    }
}

export async function updatePersonal(id: string, resumeId: string, formData: PersonalSchemaType): Promise<IResponse<PersonalPayload>> {
    try {
        const personal = await prisma.personal.update({ where: { id }, data: createDataPayload(resumeId, formData) });
        return response<PersonalPayload>(ResponseStatus.success, { payload: { [SectionEnums.personal]: personal }});
    } catch (error) {
        return response(ResponseStatus.error, { error });
    }
}