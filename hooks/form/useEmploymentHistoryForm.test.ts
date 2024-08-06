import { createMockHistory } from "@/test/mocks"
import { renderHookWithProviders } from "@/test/redux";
import { EmploymentHistory } from "@prisma/client";
import { ResponseStatus } from "@/lib/response";
import { act, waitFor } from "@testing-library/react";
import { faker } from "@faker-js/faker";
import { addEmploymentHistory, updateEmploymentHistory } from "@/lib/client/employmentHistory";
import useEmploymentHistoryForm from "./useEmploymentHistoryForm";
import { getDisplayDateFromDate } from "@/util/date";

jest.mock('@/lib/client/employmentHistory');

const mockAddEmploymentHistory = jest.mocked(addEmploymentHistory);
const mockUpdateEmploymentHistory = jest.mocked(updateEmploymentHistory);
const onSave = jest.fn();
const history = createMockHistory();

const getPayload = (history: EmploymentHistory) => ({
    title: history.title,
    startDate: getDisplayDateFromDate(history.startDate),
    endDate: history.endDate ? getDisplayDateFromDate(history?.endDate) : undefined,
    description: history.description ?? undefined,
})

describe('useEmploymentHistoryFormHook', () => {
    it('Should determine if editing', () => {
        const { result, rerender } = renderHookWithProviders((history?: EmploymentHistory) => useEmploymentHistoryForm(history));

        expect(result.current.editing).toBeFalsy();

        rerender(history);

        expect(result.current.editing).toBeTruthy();
    })
    it('Should return the correct default values for the form', () => {
        const { result } = renderHookWithProviders(() => useEmploymentHistoryForm(history))

        expect(result.current.form.getValues()).toEqual(getPayload(history))
    })
    it('Should add a new history on save', async () => {
        mockAddEmploymentHistory.mockReturnValueOnce(Promise.resolve(({ status: ResponseStatus.success, payload: { history }})))
        const payload = getPayload(history);
        const { result, store } = renderHookWithProviders(() => useEmploymentHistoryForm())

        Object.keys(payload).forEach(key => {
            result.current.form.setValue(key, history[key]);
        });

        act(() => {
            result.current.save(history.employmentId, payload, onSave);
        })

        await waitFor(() => {
            expect(onSave).toHaveBeenCalledTimes(1);
            expect(mockAddEmploymentHistory).toHaveBeenCalledWith(history.employmentId, payload);
        })

        Object.keys(payload).forEach(key => {
            expect(result.current.form.getValues()[key]).toEqual('');
        });
        const employment = store.getState().employment.employments?.find(employment => employment.id === history.employmentId);
        expect(employment?.history).toEqual([history]);
    })
    it('Should update a history on save', async () => {
        const newHistory = createMockHistory();
        newHistory.employmentId = history.employmentId;
        mockUpdateEmploymentHistory.mockReturnValueOnce(Promise.resolve(({ status: ResponseStatus.success, payload: { history: newHistory }})))
        const payload = getPayload(newHistory);
        const { result, store } = renderHookWithProviders(() => useEmploymentHistoryForm(history))

        Object.keys(payload).forEach(key => {
            result.current.form.setValue(key, newHistory[key]);
        });

        act(() => {
            result.current.save(history.employmentId, payload, onSave);
        })

        await waitFor(() => {
            expect(onSave).toHaveBeenCalledTimes(1);
            expect(mockUpdateEmploymentHistory).toHaveBeenCalledWith(history.id, history.employmentId, payload);
        })

        Object.keys(payload).forEach(key => {
            expect(result.current.form.getValues()[key]).toEqual(newHistory[key]);
        });
        const employment = store.getState().employment.employments?.find(employment => employment.id === history.employmentId);
        expect(employment?.history).toEqual([newHistory]);
    })
    it('Should handle any errors when saving form', async () => {
        const errors = [
            { path: 'title', message: faker.lorem.sentences() },
        ];
        mockAddEmploymentHistory.mockReturnValueOnce(Promise.resolve(({ status: ResponseStatus.error, formErrors: errors })))
        const payload = getPayload(history);
        const { result, store } = renderHookWithProviders(() => useEmploymentHistoryForm())

        act(() => {
            result.current.save(history.employmentId, payload, onSave);
        })

        await waitFor(async () => {
            expect(onSave).not.toHaveBeenCalled();
            expect(mockAddEmploymentHistory).toHaveBeenCalledWith(history.employmentId, payload);
        })

        const employment = store.getState().employment.employments?.find(employment => employment.id === history.employmentId)
        expect(employment?.history).toBeUndefined();
        errors.forEach(({ path, message }) => {
            expect(result.current.form.getFieldState(path).error?.message).toEqual(message);
        })
    })
})