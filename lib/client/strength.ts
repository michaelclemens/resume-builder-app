"use server"

import { StrengthSchema, StrengthSchemaType } from "@/types/strength";
import prisma from "@/lib/prisma";
import { Strength } from "@prisma/client";
import { IResponse, response, ResponseStatus } from "../response";

type StrengthPayload = { strength: Strength }

const createDataPayload = (resumeId: string, formData: StrengthSchemaType) => {
    StrengthSchema.parse(formData);
    return { resumeId, ...formData }
}

export async function getStrengths(resumeId: string) {
    try {
        return await prisma.strength.findMany({ where: { resumeId }})
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function addStrength(resumeId: string, formData: StrengthSchemaType): Promise<IResponse<StrengthPayload>> {
    try {
        const strength = await prisma.strength.create({ data: createDataPayload(resumeId, formData) });
        return response<StrengthPayload>(ResponseStatus.success, { payload: { strength }});
    } catch (error) {
        return response(ResponseStatus.error, { error });
    }
}

export async function updateStrength(id: string, resumeId: string, data: StrengthSchemaType): Promise<IResponse<StrengthPayload>> {
    try {
        const strength = await prisma.strength.update({ where: { id }, data: createDataPayload(resumeId, data) });
        return response<StrengthPayload>(ResponseStatus.success, { payload: { strength }});
    } catch (error) {
        return response(ResponseStatus.error, { error });
    }
}

export async function setSortOrders(strengths: Strength[]) {
    try {
        strengths.forEach(async(strength) => {
            await prisma.strength.update({ where: { id: strength.id }, data: { order: strength.order }})
        })
    } catch (error) {
        console.error(error);
    }
}

export async function deleteStrength(id: string) {
    try {
        await prisma.strength.delete({ where: { id } });
    } catch (error) {
        console.error(error);
    }
}