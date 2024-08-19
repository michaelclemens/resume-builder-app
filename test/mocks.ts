import { EmploymentWithHistory } from "@/types/section";
import { faker } from "@faker-js/faker";
import cuid from "cuid";
import { Education, Employment, EmploymentHistory, Personal, Resume, Skill, Strength, Template } from "@prisma/client";

export const createMockStrength = ({ index, resumeId }: { index?: number, resumeId?: string } = {}): Strength => ({
    id: cuid(),
    resumeId: resumeId ?? cuid(),
    name: faker.lorem.word(),
    order: index ?? null,
    createdAt: faker.date.anytime(),
    updatedAt: faker.date.anytime(),
})

export const createMockSkill = ({ index, resumeId }: { index?: number, resumeId?: string } = {}): Skill => ({
    id: cuid(),
    resumeId: resumeId ?? cuid(),
    name: faker.lorem.word(),
    order: index ?? null,
    createdAt: faker.date.anytime(),
    updatedAt: faker.date.anytime(),
})

export const createMockEducation = ({ index, resumeId }: { index?: number, resumeId?: string } = {}): Education => ({
    id: cuid(),
    resumeId: resumeId ?? cuid(),
    school: faker.lorem.word(),
    degree: faker.lorem.word(),
    startDate: faker.date.anytime(),
    endDate: faker.date.anytime(),
    city: faker.location.city(),
    description: faker.lorem.paragraph(),
    order: index ?? null,
    createdAt: faker.date.anytime(),
    updatedAt: faker.date.anytime(),
})

export const createMockHistory = ({ index, employmentId }: { index?: number, employmentId?: string } = {}): EmploymentHistory => ({
    id: cuid(),
    employmentId: employmentId ?? cuid(),
    title: faker.person.jobTitle(),
    startDate: faker.date.anytime(),
    endDate: faker.date.anytime(),
    description: faker.lorem.paragraph(),
    order: index ?? null,
    createdAt: faker.date.anytime(),
    updatedAt: faker.date.anytime(),
})

export const createMockEmployment = ({ index, resumeId }: { index?: number, resumeId?: string } = {}): Employment => ({
    id: cuid(),
    resumeId: resumeId ?? cuid(),
    employer: faker.lorem.word(),
    city: faker.location.city(),
    order: index ?? null,
    createdAt: faker.date.anytime(),
    updatedAt: faker.date.anytime(),
})

export const createMockEmploymentWithHistory = ({ index, resumeId }: { index?: number, resumeId?: string } = {}): EmploymentWithHistory => {
    const employmentId = cuid();
    return ({
        id: employmentId,
        resumeId: resumeId ?? cuid(),
        employer: faker.lorem.word(),
        city: faker.location.city(),
        order: index ?? null,
        createdAt: faker.date.anytime(),
        updatedAt: faker.date.anytime(),
        history: createMultipleMockItems(({ index }) => createMockHistory({ index, employmentId  }), 3),
    })
}

export const createMockPersonal = (resumeId?: string): Personal => ({
    id: cuid(),
    resumeId: resumeId ?? cuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    position: faker.person.jobTitle(),
    summary: faker.lorem.paragraph(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    city: faker.location.city(),
    country: faker.location.country(),
    createdAt: faker.date.anytime(),
    updatedAt: faker.date.anytime(),
})

export const createMockResume = (): Resume => ({
    id: cuid(),
    template: Template.DEFAULT,
    templateOptions: null,
    createdAt: faker.date.anytime(),
    updatedAt: faker.date.anytime(),
})

export const createMockFullResume = () => {
    const resume = createMockResume();

    return {
        ...resume,
        personal: createMockPersonal(resume.id),
        employments: createMultipleMockItems(createMockEmploymentWithHistory, 3, resume.id),
        educations: createMultipleMockItems(createMockEducation, 3, resume.id),
        skills: createMultipleMockItems(createMockSkill, 3, resume.id),
        strengths: createMultipleMockItems(createMockStrength, 3, resume.id),
    }
}

export function createMultipleMockItems<ItemType>(
    creator: ({ index, resumeId }: { index: number, resumeId?: string }) => ItemType, count: number = 1, resumeId?: string
): ItemType[] {
    let items = [];
    for(let i = 0; i < count; i++) {
        items.push(creator({ index: i + 1, resumeId }))
    }
    return items;
}