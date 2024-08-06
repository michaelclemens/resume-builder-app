import { createMockPersonal } from "@/test/mocks"
import { renderHookWithProviders } from "@/test/redux";
import { Personal } from "@prisma/client";
import { ResponseStatus } from "@/lib/response";
import { act, waitFor } from "@testing-library/react";
import { faker } from "@faker-js/faker";
import { addPersonal, updatePersonal } from "@/lib/client/personal";
import usePersonalForm from "./usePersonalForm";

jest.mock('@/lib/client/personal');

const mockAddPersonal = jest.mocked(addPersonal);
const mockUpdatePersonal = jest.mocked(updatePersonal);
const onSave = jest.fn();
const personal = createMockPersonal();

const getPayload = (personal: Personal) => ({
    firstName: personal.firstName,
    lastName: personal.lastName,
    position: personal.position ?? undefined,
    summary: personal.summary ?? undefined,
    email: personal.email ?? undefined,
    phone: personal.phone ?? undefined,
    city: personal.city ?? undefined,
    country: personal.country ?? undefined
})

describe('usePersonalFormHook', () => {
    it('Should determine if editing', () => {
        const { result, rerender } = renderHookWithProviders((personal?: Personal) => usePersonalForm(personal));

        expect(result.current.editing).toBeFalsy();

        rerender(personal);

        expect(result.current.editing).toBeTruthy();
    })
    it('Should return the correct default values for the form', () => {
        const { result } = renderHookWithProviders(() => usePersonalForm(personal))

        expect(result.current.form.getValues()).toEqual(getPayload(personal))
    })
    it('Should add a new personal on save', async () => {
        mockAddPersonal.mockReturnValueOnce(Promise.resolve(({ status: ResponseStatus.success, payload: { personal }})))
        const payload = getPayload(personal);
        const { result, store } = renderHookWithProviders(() => usePersonalForm())

        Object.keys(payload).forEach(key => {
            result.current.form.setValue(key, personal[key]);
        });

        act(() => {
            result.current.save(personal.resumeId, payload, onSave);
        })

        await waitFor(async () => {
            expect(onSave).toHaveBeenCalledTimes(1);
            expect(mockAddPersonal).toHaveBeenCalledWith(personal.resumeId, payload);
        })

        Object.keys(payload).forEach(key => {
            expect(result.current.form.getValues()[key]).toEqual('');
        });
        expect(store.getState().personal.item).toEqual(personal);
    })
    it('Should update a personal on save', async () => {
        const newPersonal = createMockPersonal();
        mockUpdatePersonal.mockReturnValueOnce(Promise.resolve(({ status: ResponseStatus.success, payload: { personal: newPersonal }})))
        const payload = getPayload(newPersonal);
        const { result, store } = renderHookWithProviders(() => usePersonalForm(personal))

        Object.keys(payload).forEach(key => {
            result.current.form.setValue(key, newPersonal[key]);
        });

        act(() => {
            result.current.save(personal.resumeId, payload, onSave);
        })

        await waitFor(async () => {
            expect(onSave).toHaveBeenCalledTimes(1);
            expect(mockUpdatePersonal).toHaveBeenCalledWith(personal.id, personal.resumeId, payload);
        })

        Object.keys(payload).forEach(key => {
            expect(result.current.form.getValues()[key]).toEqual(newPersonal[key]);
        });
        expect(store.getState().personal.item).toEqual(newPersonal);
    })
    it('Should handle any errors when saving form', async () => {
        const errors = [
            { path: 'firstName', message: faker.lorem.sentences() },
            { path: 'lastName', message: faker.lorem.sentences() },
        ];
        mockAddPersonal.mockReturnValueOnce(Promise.resolve(({ status: ResponseStatus.error, formErrors: errors })))
        const payload = getPayload(personal);
        const { result, store } = renderHookWithProviders(() => usePersonalForm())

        act(() => {
            result.current.save(personal.resumeId, payload, onSave);
        })

        await waitFor(async () => {
            expect(onSave).not.toHaveBeenCalled();
            expect(mockAddPersonal).toHaveBeenCalledWith(personal.resumeId, payload);
        })

        expect(store.getState().personal.item).toBeNull();
        errors.forEach(({ path, message }) => {
            expect(result.current.form.getFieldState(path).error?.message).toEqual(message);
        })
    })
})