import { ResumeFull } from "@/lib/client/resume";
import { EmploymentWithHistory } from "@/types/section";
import { faker } from "@faker-js/faker";
import { zodResolver } from "@hookform/resolvers/zod";
import { Education, Employment, EmploymentHistory, Personal, Resume, Skill, Strength, Template } from "@prisma/client";
import { render, renderHook } from "@testing-library/react";
import { useForm } from "react-hook-form";

export const createMockStrength = ({ index }: { index?: number } = {}): Strength => ({
    id: faker.string.alphanumeric({ length: 5 }),
    resumeId: faker.string.alphanumeric({ length: 5 }),
    name: faker.lorem.word(),
    order: index ?? null,
    createdAt: faker.date.anytime(),
    updatedAt: faker.date.anytime(),
})

export const createMockSkill = ({ index }: { index?: number } = {}): Skill => ({
    id: faker.string.alphanumeric({ length: 5 }),
    resumeId: faker.string.alphanumeric({ length: 5 }),
    name: faker.lorem.word(),
    order: index ?? null,
    createdAt: faker.date.anytime(),
    updatedAt: faker.date.anytime(),
})

export const createMockEducation = ({ index }: { index?: number } = {}): Education => ({
    id: faker.string.alphanumeric({ length: 5 }),
    resumeId: faker.string.alphanumeric({ length: 5 }),
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
    id: faker.string.alphanumeric({ length: 5 }),
    employmentId: employmentId ?? faker.string.alphanumeric({ length: 5 }),
    title: faker.person.jobTitle(),
    startDate: faker.date.anytime(),
    endDate: faker.date.anytime(),
    description: faker.lorem.paragraph(),
    order: index ?? null,
    createdAt: faker.date.anytime(),
    updatedAt: faker.date.anytime(),
})

export const createMockEmployment = ({ index }: { index?: number } = {}): Employment => ({
    id: faker.string.alphanumeric({ length: 5 }),
    resumeId: faker.string.alphanumeric({ length: 5 }),
    employer: faker.lorem.word(),
    city: faker.location.city(),
    order: index ?? null,
    createdAt: faker.date.anytime(),
    updatedAt: faker.date.anytime(),
})

export const createMockEmploymentWithHistory = ({ index, }: { index?: number } = {}): EmploymentWithHistory => {
    const employmentId = faker.string.alphanumeric({ length: 5 });
    return ({
        id: employmentId,
        resumeId: faker.string.alphanumeric({ length: 5 }),
        employer: faker.lorem.word(),
        city: faker.location.city(),
        order: index ?? null,
        createdAt: faker.date.anytime(),
        updatedAt: faker.date.anytime(),
        history: createMultipleMockItems(({ index }) => createMockHistory({ index, employmentId  }), 3),
    })
}

export const createMockPersonal = (): Personal => ({
    id: faker.string.alphanumeric({ length: 5 }),
    resumeId: faker.string.alphanumeric({ length: 5 }),
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
    id: faker.string.alphanumeric({ length: 5 }),
    template: Template.DEFAULT,
    templateOptions: null,
    createdAt: faker.date.anytime(),
    updatedAt: faker.date.anytime(),
})

export const createMockFullResume = (): ResumeFull => ({
    ...createMockResume(),
    personal: createMockPersonal(),
    employments: createMultipleMockItems(createMockEmploymentWithHistory, 3),
    educations: createMultipleMockItems(createMockEducation, 3),
    skills: createMultipleMockItems(createMockSkill, 3),
    strengths: createMultipleMockItems(createMockStrength, 3),
})

export function createMultipleMockItems<ItemType>(creator: ({ index }: { index: number }) => ItemType, count: number = 1): ItemType[] {
    let items = [];
    for(let i = 0; i < count; i++) {
        items.push(creator({ index: i + 1 }))
    }
    return items;
}

export const renderUseFormHook = ({ defaultValues, schema }) => (
    renderHook(() => useForm({ 
        resolver: zodResolver(schema), 
        defaultValues
    }))
)

export const renderFormBody = ({ component: FormBodyComponent, editing, defaultValues, schema, onSave } = {}) => {
    const hook = renderUseFormHook({ defaultValues, schema });
    const MockFormWrapper = ({ children }) => (
        <form role="form" onSubmit={hook.result.current.handleSubmit(onSave)}>
            {children}
        </form>
    );
    const formBody = (hook) => (
        <FormBodyComponent
            form={hook.result.current}
            editing={editing}
        />
    );
    const component = render(formBody(hook), { wrapper: MockFormWrapper });
    const rerenderHook = () => {
        hook.rerender();
        component.rerender(formBody(hook));
    }

    return { ...component, rerenderHook }
}