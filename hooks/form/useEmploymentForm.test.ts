import { createMockEmployment } from "@/test/mocks"
import { renderHookWithProviders } from "@/test/redux";
import { Employment } from "@prisma/client";
import { ResponseStatus } from "@/lib/response";
import { act, waitFor } from "@testing-library/react";
import { faker } from "@faker-js/faker";
import { addEmployment, updateEmployment } from "@/lib/client/employment";
import useEmploymentForm from "./useEmploymentForm";

jest.mock('@/lib/client/employment');

const mockAddEmployment = jest.mocked(addEmployment);
const mockUpdateEmployment = jest.mocked(updateEmployment);
const onSave = jest.fn();
const employment = createMockEmployment();

const getPayload = (employment: Employment) => ({
    employer: employment.employer,
    city: employment.city ?? undefined
})

describe('useEmploymentFormHook', () => {
    it('Should determine if editing', () => {
        const { result, rerender } = renderHookWithProviders((employment?: Employment) => useEmploymentForm(employment));

        expect(result.current.editing).toBeFalsy();

        rerender(employment);

        expect(result.current.editing).toBeTruthy();
    })
    it('Should return the correct default values for the form', () => {
        const { result } = renderHookWithProviders(() => useEmploymentForm(employment))

        expect(result.current.form.getValues()).toEqual(getPayload(employment))
    })
    it('Should add a new employment on save', async () => {
        mockAddEmployment.mockReturnValueOnce(Promise.resolve(({ status: ResponseStatus.success, payload: { employment }})))
        const payload = getPayload(employment);
        const { result, store } = renderHookWithProviders(() => useEmploymentForm())

        Object.keys(payload).forEach(key => {
            result.current.form.setValue(key, employment[key]);
        });

        act(() => {
            result.current.save(employment.resumeId, payload, onSave);
        })

        await waitFor(() => {
            expect(onSave).toHaveBeenCalledTimes(1);
            expect(mockAddEmployment).toHaveBeenCalledWith(employment.resumeId, payload);
        })

        Object.keys(payload).forEach(key => {
            expect(result.current.form.getValues()[key]).toEqual('');
        });
        expect(store.getState().employment.employments).toEqual([employment]);
    })
    it('Should update a employment on save', async () => {
        const newEmployment = createMockEmployment();
        mockUpdateEmployment.mockReturnValueOnce(Promise.resolve(({ status: ResponseStatus.success, payload: { employment: newEmployment }})))
        const payload = getPayload(newEmployment);
        const { result, store } = renderHookWithProviders(() => useEmploymentForm(employment))

        Object.keys(payload).forEach(key => {
            result.current.form.setValue(key, newEmployment[key]);
        });

        act(() => {
            result.current.save(employment.resumeId, payload, onSave);
        })

        await waitFor(() => {
            expect(onSave).toHaveBeenCalledTimes(1);
            expect(mockUpdateEmployment).toHaveBeenCalledWith(employment.id, employment.resumeId, payload);
        })

        Object.keys(payload).forEach(key => {
            expect(result.current.form.getValues()[key]).toEqual(newEmployment[key]);
        });
        expect(store.getState().employment.employments).toEqual([newEmployment]);
    })
    it('Should handle any errors when saving form', async () => {
        const errors = [
            { path: 'employer', message: faker.lorem.sentences() },
        ];
        mockAddEmployment.mockReturnValueOnce(Promise.resolve(({ status: ResponseStatus.error, formErrors: errors })))
        const payload = getPayload(employment);
        const { result, store } = renderHookWithProviders(() => useEmploymentForm())

        act(() => {
            result.current.save(employment.resumeId, payload, onSave);
        })

        await waitFor(async () => {
            expect(onSave).not.toHaveBeenCalled();
            expect(mockAddEmployment).toHaveBeenCalledWith(employment.resumeId, payload);
        })

        expect(store.getState().employment.employments).toBeNull();
        errors.forEach(({ path, message }) => {
            expect(result.current.form.getFieldState(path).error?.message).toEqual(message);
        })
    })
})