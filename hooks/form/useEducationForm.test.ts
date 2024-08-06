import { createMockEducation } from "@/test/mocks"
import { renderHookWithProviders } from "@/test/redux";
import { Education } from "@prisma/client";
import { ResponseStatus } from "@/lib/response";
import { act, waitFor } from "@testing-library/react";
import { faker } from "@faker-js/faker";
import { addEducation, updateEducation } from "@/lib/client/education";
import useEducationForm from "./useEducationForm";
import { getDisplayDateFromDate } from "@/util/date";

jest.mock('@/lib/client/education');

const mockAddEducation = jest.mocked(addEducation);
const mockUpdateEducation = jest.mocked(updateEducation);
const onSave = jest.fn();
const education = createMockEducation();

const getPayload = (education: Education) => ({
    school: education.school,
    degree: education.degree,
    startDate: getDisplayDateFromDate(education.startDate),
    endDate: education.endDate ? getDisplayDateFromDate(education.endDate) : undefined,
    city: education.city ?? undefined,
    description: education.description ?? undefined
})

describe('useEducationFormHook', () => {
    it('Should determine if editing', () => {
        const { result, rerender } = renderHookWithProviders((education?: Education) => useEducationForm(education));

        expect(result.current.editing).toBeFalsy();

        rerender(education);

        expect(result.current.editing).toBeTruthy();
    })
    it('Should return the correct default values for the form', () => {
        const { result } = renderHookWithProviders(() => useEducationForm(education))

        expect(result.current.form.getValues()).toEqual(getPayload(education))
    })
    it('Should add a new education on save', async () => {
        mockAddEducation.mockReturnValueOnce(Promise.resolve(({ status: ResponseStatus.success, payload: { education }})))
        const payload = getPayload(education);
        const { result, store } = renderHookWithProviders(() => useEducationForm())

        Object.keys(payload).forEach(key => {
            result.current.form.setValue(key, education[key]);
        });

        act(() => {
            result.current.save(education.resumeId, payload, onSave);
        })

        await waitFor(() => {
            expect(onSave).toHaveBeenCalledTimes(1);
            expect(mockAddEducation).toHaveBeenCalledWith(education.resumeId, payload);
        })

        Object.keys(payload).forEach(key => {
            expect(result.current.form.getValues()[key]).toEqual('');
        });
        expect(store.getState().education.items).toEqual([education]);
    })
    it('Should update a education on save', async () => {
        const newEducation = createMockEducation();
        mockUpdateEducation.mockReturnValueOnce(Promise.resolve(({ status: ResponseStatus.success, payload: { education: newEducation }})))
        const payload = getPayload(newEducation);
        const { result, store } = renderHookWithProviders(() => useEducationForm(education))

        Object.keys(payload).forEach(key => {
            result.current.form.setValue(key, newEducation[key]);
        });

        act(() => {
            result.current.save(education.resumeId, payload, onSave);
        })

        await waitFor(() => {
            expect(onSave).toHaveBeenCalledTimes(1);
            expect(mockUpdateEducation).toHaveBeenCalledWith(education.id, education.resumeId, payload);
        })

        Object.keys(payload).forEach(key => {
            expect(result.current.form.getValues()[key]).toEqual(newEducation[key]);
        });
        expect(store.getState().education.items).toEqual([newEducation]);
    })
    it('Should handle any errors when saving form', async () => {
        const errors = [
            { path: 'school', message: faker.lorem.sentences() },
            { path: 'degree', message: faker.lorem.sentences() }
        ];
        mockAddEducation.mockReturnValueOnce(Promise.resolve(({ status: ResponseStatus.error, formErrors: errors })))
        const payload = getPayload(education);
        const { result, store } = renderHookWithProviders(() => useEducationForm())

        act(() => {
            result.current.save(education.resumeId, payload, onSave);
        })

        await waitFor(() => {
            expect(onSave).not.toHaveBeenCalled();
            expect(mockAddEducation).toHaveBeenCalledWith(education.resumeId, payload);
        })

        expect(store.getState().education.items).toBeNull();
        errors.forEach(({ path, message }) => {
            expect(result.current.form.getFieldState(path).error?.message).toEqual(message);
        })
    })
})