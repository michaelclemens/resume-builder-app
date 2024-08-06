import { addStrength, updateStrength } from "@/lib/client/strength";
import useStrengthForm from "./useStrengthForm"
import { createMockStrength } from "@/test/mocks"
import { renderHookWithProviders } from "@/test/redux";
import { Strength } from "@prisma/client";
import { ResponseStatus } from "@/lib/response";
import { act, waitFor } from "@testing-library/react";
import { faker } from "@faker-js/faker";

jest.mock('@/lib/client/strength');

const mockAddStrength = jest.mocked(addStrength);
const mockUpdateStrength = jest.mocked(updateStrength);
const onSave = jest.fn();
const strength = createMockStrength();

describe('useStrengthFormHook', () => {
    it('Should determine if editing', () => {
        const { result, rerender } = renderHookWithProviders((strength?: Strength) => useStrengthForm(strength));

        expect(result.current.editing).toBeFalsy();

        rerender(strength);

        expect(result.current.editing).toBeTruthy();
    })
    it('Should return the correct default values for the form', () => {
        const { result } = renderHookWithProviders(() => useStrengthForm(strength))

        expect(result.current.form.getValues()).toEqual({ name: strength.name })
    })
    it('Should add a new strength on save', async () => {
        mockAddStrength.mockReturnValueOnce(Promise.resolve(({ status: ResponseStatus.success, payload: { strength }})))
        const { result, store } = renderHookWithProviders(() => useStrengthForm())

        result.current.form.setValue('name', strength.name);
        
        act(() => {
            result.current.save(strength.resumeId, { name: strength.name }, onSave);
        })

        await waitFor(async () => {
            expect(onSave).toHaveBeenCalledTimes(1);
            expect(mockAddStrength).toHaveBeenCalledWith(strength.resumeId, { name: strength.name });
        })
        
        expect(result.current.form.getValues().name).toEqual('');
        expect(store.getState().strength.items).toEqual([strength]);
    })
    it('Should update a strength on save', async () => {
        const newStrength = createMockStrength();
        mockUpdateStrength.mockReturnValueOnce(Promise.resolve(({ status: ResponseStatus.success, payload: { strength: newStrength }})))
        const { result, store } = renderHookWithProviders(() => useStrengthForm(strength))

        result.current.form.setValue('name', newStrength.name);

        act(() => {
            result.current.save(strength.resumeId, { name: newStrength.name }, onSave);
        })

        await waitFor(async () => {
            expect(onSave).toHaveBeenCalledTimes(1);
            expect(mockUpdateStrength).toHaveBeenCalledWith(strength.id, strength.resumeId, { name: newStrength.name });
        })
        
        expect(result.current.form.getValues().name).toEqual(newStrength.name);
        expect(store.getState().strength.items).toEqual([newStrength]);
    })
    it('Should handle any errors when saving form', async () => {
        const error = { path: 'name', message: faker.lorem.sentences() };
        mockAddStrength.mockReturnValueOnce(Promise.resolve(({ status: ResponseStatus.error, formErrors: [error] })))
        const { result, store } = renderHookWithProviders(() => useStrengthForm())

        act(() => {
            result.current.save(strength.resumeId, { name: strength.name }, onSave);
        })

        await waitFor(async () => {
            expect(onSave).not.toHaveBeenCalled();
            expect(mockAddStrength).toHaveBeenCalledWith(strength.resumeId, { name: strength.name });
            
        })
        
        expect(store.getState().strength.items).toBeNull();
        expect(result.current.form.getFieldState('name').error?.message).toEqual(error.message);
    })
})