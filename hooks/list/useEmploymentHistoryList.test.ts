import { renderHookWithProviders } from "@/test/redux";
import useEmploymentHistoryList from "./useEmploymentHistoryList";
import { createMockEmploymentWithHistory } from "@/test/mocks";
import { act, waitFor } from "@testing-library/react";
import { deleteEmploymentHistory, setSortOrders } from "@/lib/client/employmentHistory";
import { faker } from "@faker-js/faker";

jest.mock('@/lib/client/employmentHistory');
console.error = jest.fn();

const mockDeleteEmploymentHistory = jest.mocked(deleteEmploymentHistory);
const mockSetSortOrders = jest.mocked(setSortOrders);
const employment = createMockEmploymentWithHistory();
const histories = employment.history;

describe('useEmploymentHistoryListHook', () => {
    it('Should do nothing if no items are passed', () => {
        const { result, store } = renderHookWithProviders(() => useEmploymentHistoryList());

        expect(result.current.items).toEqual([]);
        expect(store.getState().employment.employments).toBeNull();
    })
    it('Should successfully remove an item', async () => {
        const { result, store } = renderHookWithProviders(() => useEmploymentHistoryList({ parentId: employment.id, initialItems: histories }), {
            preloadedState: { employment: { employments: [employment] }}
        });
                
        expect(result.current.deleting).toBeFalsy();

        const deletedItem = histories[1];
        act(() => {
            result.current.remove(deletedItem);
        })

        await waitFor(() => {
            expect(result.current.items.includes(deletedItem)).toBeFalsy();
            expect(store.getState().employment.employments?.find(item => item.id === employment.id)?.history.includes(deletedItem)).toBeFalsy();
        })   
    })
    it('Should handle errors when removing an item', async () => {
        const error = new Error(faker.lorem.sentence());
        mockDeleteEmploymentHistory.mockRejectedValueOnce(error);
        const { result, store } = renderHookWithProviders(() => useEmploymentHistoryList({ parentId: employment.id, initialItems: histories }), {
            preloadedState: { employment: { employments: [employment] }}
        });

        const deletedItem = histories[0];
        act(() => {
            result.current.remove(deletedItem);
        })

        await waitFor(() => {
            expect(console.error).toHaveBeenCalledWith(error);
        })

        expect(result.current.items.includes(deletedItem)).toBeTruthy();
        expect(store.getState().employment.employments?.find(item => item.id === employment.id)?.history?.includes(deletedItem)).toBeTruthy();
    })
    it('Should return editing state', async () => {
        const { result } = renderHookWithProviders(() => useEmploymentHistoryList());

        expect(result.current.editing).toBeFalsy();

        act(() => {
            result.current.setEditing(true);
        })

        await waitFor(() => expect(result.current.editing).toBeTruthy())
    })
    it('Should save a new sort order', async () => {
        const { result, store } = renderHookWithProviders(() => useEmploymentHistoryList({ parentId: employment.id, initialItems: histories }), {
            preloadedState: { employment: { employments: [employment] }}
        });

        const sortableItems = [...histories];
        expect(sortableItems[0].order).toEqual(1);
        expect(sortableItems[2].order).toEqual(3);

        sortableItems[0] = {...sortableItems[0], order: 3};
        sortableItems[2] = {...sortableItems[2], order: 1};

        act(() => {
            result.current.saveSortOrder(sortableItems);
        })

        await waitFor(() => {
            expect(mockSetSortOrders).toHaveBeenCalledWith(sortableItems);
        })

        expect(result.current.items[0].order).toEqual(3);
        expect(result.current.items[2].order).toEqual(1);
        expect(store.getState().employment.employments?.find(item => item.id === employment.id)?.history[0].order).toEqual(3);
        expect(store.getState().employment.employments?.find(item => item.id === employment.id)?.history[2].order).toEqual(1);
    })
})