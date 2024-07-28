"use server"

import prisma from "@/lib/prisma";
import { SkillSchema, SkillSchemaType } from "@/types/form";
import { Skill } from "@prisma/client";
import { IResponse, response, ResponseStatus } from "../response";

type SkillPayload = { skill: Skill }

const createDataPayload = (resumeId: string, formData: SkillSchemaType) => {
    SkillSchema.parse(formData);
    return { resumeId, ...formData }
}

export async function getSkills(resumeId: string) {
    try {
        return await prisma.skill.findMany({ where: { resumeId }})
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function addSkill(resumeId: string, formData: SkillSchemaType): Promise<IResponse<SkillPayload>> {
    try {
        const skill = await prisma.skill.create({ data: createDataPayload(resumeId, formData) });
        return response<SkillPayload>(ResponseStatus.success, { payload: { skill }});
    } catch (error) {
        return response(ResponseStatus.error, { error });
    }
}

export async function updateSkill(id: string, resumeId: string, formData: SkillSchemaType): Promise<IResponse<SkillPayload>> {
    try {
        const skill = await prisma.skill.update({ where: { id }, data: createDataPayload(resumeId, formData) });
        return response<SkillPayload>(ResponseStatus.success, { payload: { skill }});
    } catch (error) {
        return response(ResponseStatus.error, { error });
    }
}

export async function setSortOrders(skills: Skill[]) {
    try {
        skills.forEach(async(skill) => {
            await prisma.skill.update({ where: { id: skill.id }, data: { order: skill.order }})
        })
    } catch (error) {
        console.error(error);
    }
}

export async function deleteSkill(id: string) {
    try {
        await prisma.skill.delete({ where: { id } });
    } catch (error) {
        console.error(error);
    }
}