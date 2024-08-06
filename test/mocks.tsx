import { EmploymentWithHistory } from "@/lib/client/employment";
import { faker } from "@faker-js/faker";
import { zodResolver } from "@hookform/resolvers/zod";
import { Education, EmploymentHistory, Personal, Skill, Strength } from "@prisma/client";
import { render, renderHook } from "@testing-library/react";
import { useForm } from "react-hook-form";

export const createMockStrength = (): Strength => ({
    id: faker.string.alphanumeric({ length: 5 }),
    resumeId: faker.string.alphanumeric({ length: 5 }),
    name: faker.lorem.word(),
    order: null,
    createdAt: faker.date.anytime(),
    updatedAt: faker.date.anytime(),
})

export const createMockSkill = (): Skill => ({
    id: faker.string.alphanumeric({ length: 5 }),
    resumeId: faker.string.alphanumeric({ length: 5 }),
    name: faker.lorem.word(),
    order: null,
    createdAt: faker.date.anytime(),
    updatedAt: faker.date.anytime(),
})

export const createMockEducation = (): Education => ({
    id: faker.string.alphanumeric({ length: 5 }),
    resumeId: faker.string.alphanumeric({ length: 5 }),
    school: faker.lorem.word(),
    degree: faker.lorem.word(),
    startDate: faker.date.anytime(),
    endDate: faker.date.anytime(),
    city: faker.location.city(),
    description: faker.lorem.paragraph(),
    order: null,
    createdAt: faker.date.anytime(),
    updatedAt: faker.date.anytime(),
})

export const createMockHistory = (): EmploymentHistory => ({
    id: faker.string.alphanumeric({ length: 5 }),
    employmentId: faker.string.alphanumeric({ length: 5 }),
    title: faker.person.jobTitle(),
    startDate: faker.date.anytime(),
    endDate: faker.date.anytime(),
    description: faker.lorem.paragraph(),
    order: null,
    createdAt: faker.date.anytime(),
    updatedAt: faker.date.anytime(),
})

export const createMockEmployment = (histories: EmploymentHistory[] = []): EmploymentWithHistory => ({
    id: faker.string.alphanumeric({ length: 5 }),
    resumeId: faker.string.alphanumeric({ length: 5 }),
    employer: faker.lorem.word(),
    city: faker.location.city(),
    order: null,
    createdAt: faker.date.anytime(),
    updatedAt: faker.date.anytime(),
    history: histories,
})

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

export const createMockStrengths = (count: number = 1): Strength[] => {
    let strengths = [];
    for(let i = 0; i <= count; i++) {
        strengths.push(createMockStrength())
    }
    return strengths;
}

export const createMockHistories = (count: number = 1): EmploymentHistory[] => {
    let history = [];
    for(let i = 0; i <= count; i++) {
        history.push(createMockHistory())
    }
    return history;
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