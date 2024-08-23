import { EmploymentWithHistory } from '@/types/section'
import { faker } from '@faker-js/faker'
import cuid from 'cuid'
import { Education, Employment, EmploymentHistory, Personal, Resume, Skill, Strength, Template } from '@prisma/client'

export const createMockStrength = ({ index, resumeId }: { index?: number; resumeId?: string } = {}): Strength => ({
  id: cuid(),
  resumeId: resumeId ?? cuid(),
  name: faker.helpers.arrayElement([faker.company.buzzVerb(), faker.company.catchPhraseDescriptor()]),
  order: index ?? null,
  createdAt: faker.date.recent(),
  updatedAt: faker.date.recent(),
})

export const createMockSkill = ({ index, resumeId }: { index?: number; resumeId?: string } = {}): Skill => ({
  id: cuid(),
  resumeId: resumeId ?? cuid(),
  name: faker.helpers.arrayElement([faker.company.buzzNoun(), faker.company.catchPhraseNoun(), faker.lorem.word({ length: { min: 5, max: 10 } })]),
  order: index ?? null,
  createdAt: faker.date.recent(),
  updatedAt: faker.date.recent(),
})

export const createMockEducation = ({ index, resumeId }: { index?: number; resumeId?: string } = {}): Education => {
  const endDate = faker.date.past()
  const startDate = faker.date.past({ refDate: endDate })
  return {
    id: cuid(),
    resumeId: resumeId ?? cuid(),
    school: faker.lorem.words({ min: 2, max: 3 }),
    degree: faker.lorem.words({ min: 3, max: 4 }),
    startDate,
    endDate,
    city: faker.location.city(),
    description: faker.lorem.paragraph({ min: 1, max: 5 }),
    order: index ?? null,
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  }
}

export const createMockHistory = ({ index, employmentId }: { index?: number; employmentId?: string } = {}): EmploymentHistory => {
  const endDate = faker.date.past()
  const startDate = faker.date.past({ refDate: endDate })
  return {
    id: cuid(),
    employmentId: employmentId ?? cuid(),
    title: faker.person.jobTitle(),
    startDate,
    endDate,
    description: faker.lorem.paragraphs({ min: 1, max: 3 }, '\n'),
    order: index ?? null,
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  }
}

export const createMockEmployment = ({ index, resumeId }: { index?: number; resumeId?: string } = {}): Employment => ({
  id: cuid(),
  resumeId: resumeId ?? cuid(),
  employer: faker.company.name(),
  city: faker.location.city(),
  order: index ?? null,
  createdAt: faker.date.recent(),
  updatedAt: faker.date.recent(),
})

export const createMockEmploymentWithHistory = ({ index, resumeId }: { index?: number; resumeId?: string } = {}): EmploymentWithHistory => {
  const employmentId = cuid()
  return {
    id: employmentId,
    resumeId: resumeId ?? cuid(),
    employer: faker.company.name(),
    city: faker.location.city(),
    order: index ?? null,
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
    history: createMultipleMockItems(({ index }) => createMockHistory({ index, employmentId }), 3),
  }
}

export const createMockPersonal = (resumeId?: string): Personal => {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  return {
    id: cuid(),
    resumeId: resumeId ?? cuid(),
    firstName,
    lastName,
    position: faker.person.jobTitle(),
    summary: faker.lorem.paragraph({ min: 10, max: 15 }),
    email: faker.internet.email({ firstName, lastName }),
    phone: faker.helpers.fromRegExp('+44[0-9]{10}'),
    city: faker.location.city(),
    country: faker.location.country(),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
  }
}

export const createMockResume = (): Resume => ({
  id: cuid(),
  template: faker.helpers.enumValue(Template),
  templateOptions: null,
  createdAt: faker.date.recent(),
  updatedAt: faker.date.recent(),
})

export const createMockFullResume = () => {
  const resume = createMockResume()

  return {
    ...resume,
    personal: createMockPersonal(resume.id),
    employments: createMultipleMockItems(createMockEmploymentWithHistory, 2, resume.id),
    educations: createMultipleMockItems(createMockEducation, 2, resume.id),
    skills: createMultipleMockItems(createMockSkill, 8, resume.id),
    strengths: createMultipleMockItems(createMockStrength, 5, resume.id),
  }
}

export function createMultipleMockItems<ItemType>(
  creator: ({ index, resumeId }: { index: number; resumeId?: string }) => ItemType,
  count: number = 1,
  resumeId?: string
): ItemType[] {
  let items = []
  for (let i = 0; i < count; i++) {
    items.push(creator({ index: i + 1, resumeId }))
  }
  return items
}

const escapeRegex = (string: string) => string.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&')

export const regexString = (string: string, atBeginning: boolean = true, flags: string = 'i') =>
  new RegExp(`${atBeginning ? '^' : ''}${escapeRegex(string)}`, flags)
