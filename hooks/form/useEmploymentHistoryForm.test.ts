import { createMockEmploymentWithHistory, createMockHistory } from "@/test/mocks"
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
const employment = createMockEmploymentWithHistory();
const history = employment.history[0];

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
        const newHistory = createMockHistory();
        newHistory.employmentId = employment.id;

        mockAddEmploymentHistory.mockReturnValueOnce(Promise.resolve(({ status: ResponseStatus.success, payload: { history: newHistory }})))
        const payload = getPayload(newHistory);
        const { result, store } = renderHookWithProviders(() => useEmploymentHistoryForm(), {
            preloadedState: { employment: { items: [employment] }}
        })

        Object.keys(payload).forEach(key => {
            result.current.form.setValue(key, newHistory[key]);
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
        const employmentState = store.getState().employment.items?.find(employment => employment.id === history.employmentId);
        expect(employmentState?.history).toEqual([...employment.history, newHistory]);
        expect(employmentState?.history.length).toEqual(employment.history.length + 1);
    })
    it('Should update a history on save', async () => {
        const title = faker.lorem.word();
        const updateHistory = {...employment.history[1]};
        updateHistory.title = title;

        mockUpdateEmploymentHistory.mockReturnValueOnce(Promise.resolve(({ status: ResponseStatus.success, payload: { history: updateHistory }})))
        const payload = getPayload(updateHistory);
        const { result, store } = renderHookWithProviders(() => useEmploymentHistoryForm(history), {
            preloadedState: { employment: { items: [employment] }}
        })

        Object.keys(payload).forEach(key => {
            result.current.form.setValue(key, updateHistory[key]);
        });

        act(() => {
            result.current.save(history.employmentId, payload, onSave);
        })

        await waitFor(() => {
            expect(onSave).toHaveBeenCalledTimes(1);
            expect(mockUpdateEmploymentHistory).toHaveBeenCalledWith(history.id, history.employmentId, payload);
        })

        Object.keys(payload).forEach(key => {
            expect(result.current.form.getValues()[key]).toEqual(updateHistory[key]);
        });
        const employmentState = store.getState().employment.items?.find(employment => employment.id === history.employmentId);
        expect(employmentState?.history.find(item => item.id === updateHistory.id)).toEqual(updateHistory);
        expect(employmentState?.history.length).toEqual(employment.history.length);
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

        const employment = store.getState().employment.items?.find(employment => employment.id === history.employmentId)
        expect(employment?.history).toBeUndefined();
        errors.forEach(({ path, message }) => {
            expect(result.current.form.getFieldState(path).error?.message).toEqual(message);
        })
    })
})