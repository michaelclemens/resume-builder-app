import { faker } from "@faker-js/faker";
import { Strength } from "@prisma/client";

export const createMockStrength = () => ({
    id: faker.string.alphanumeric({ length: 5 }),
    resumeId: faker.string.alphanumeric({ length: 5 }),
    name: faker.lorem.word(),
    order: null,
    createdAt: faker.date.anytime(),
    updatedAt: faker.date.anytime(),
})

export const createMockStrengths = (count: number = 1): Strength[] => {
    let strengths = [];
    for(let i = 0; i <= count; i++) {
        strengths.push(createMockStrength())
    }
    return strengths;
}