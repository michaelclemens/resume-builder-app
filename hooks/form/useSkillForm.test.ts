import { createMockSkill } from "@/test/mocks"
import { renderHookWithProviders } from "@/test/redux";
import { Skill } from "@prisma/client";
import { ResponseStatus } from "@/lib/response";
import { act, waitFor } from "@testing-library/react";
import { faker } from "@faker-js/faker";
import { addSkill, updateSkill } from "@/lib/client/skill";
import useSkillForm from "./useSkillForm";

jest.mock('@/lib/client/skill');

const mockAddSkill = jest.mocked(addSkill);
const mockUpdateSkill = jest.mocked(updateSkill);
const onSave = jest.fn();
const skill = createMockSkill();

describe('useSkillFormHook', () => {
    it('Should determine if editing', () => {
        const { result, rerender } = renderHookWithProviders((skill?: Skill) => useSkillForm(skill));

        expect(result.current.editing).toBeFalsy();

        rerender(skill);

        expect(result.current.editing).toBeTruthy();
    })
    it('Should return the correct default values for the form', () => {
        const { result } = renderHookWithProviders(() => useSkillForm(skill))

        expect(result.current.form.getValues()).toEqual({ name: skill.name })
    })
    it('Should add a new skill on save', async () => {
        mockAddSkill.mockReturnValueOnce(Promise.resolve(({ status: ResponseStatus.success, payload: { skill }})))
        const { result, store } = renderHookWithProviders(() => useSkillForm())

        result.current.form.setValue('name', skill.name);

        act(() => {
            result.current.save(skill.resumeId, { name: skill.name }, onSave);
        })

        await waitFor(async () => {
            expect(onSave).toHaveBeenCalledTimes(1);
            expect(mockAddSkill).toHaveBeenCalledWith(skill.resumeId, { name: skill.name });
        })

        expect(result.current.form.getValues().name).toEqual('');
        expect(store.getState().skill.skills).toEqual([skill]);
    })
    it('Should update a skill on save', async () => {
        const newSkill = createMockSkill();
        mockUpdateSkill.mockReturnValueOnce(Promise.resolve(({ status: ResponseStatus.success, payload: { skill: newSkill }})))
        const { result, store } = renderHookWithProviders(() => useSkillForm(skill))

        result.current.form.setValue('name', newSkill.name);

        act(() => {
            result.current.save(skill.resumeId, { name: newSkill.name }, onSave);
        })

        await waitFor(async () => {
            expect(onSave).toHaveBeenCalledTimes(1);
            expect(mockUpdateSkill).toHaveBeenCalledWith(skill.id, skill.resumeId, { name: newSkill.name });
        })

        expect(result.current.form.getValues().name).toEqual(newSkill.name);
        expect(store.getState().skill.skills).toEqual([newSkill]);
    })
    it('Should handle any errors when saving form', async () => {
        const error = { path: 'name', message: faker.lorem.sentences() };
        mockAddSkill.mockReturnValueOnce(Promise.resolve(({ status: ResponseStatus.error, formErrors: [error] })))
        const { result, store } = renderHookWithProviders(() => useSkillForm())

        act(() => {
            result.current.save(skill.resumeId, { name: skill.name }, onSave);
        })

        await waitFor(async () => {
            expect(onSave).not.toHaveBeenCalled();
            expect(mockAddSkill).toHaveBeenCalledWith(skill.resumeId, { name: skill.name });
        })

        expect(store.getState().skill.skills).toBeNull();
        expect(result.current.form.getFieldState('name').error?.message).toEqual(error.message);
    })
})