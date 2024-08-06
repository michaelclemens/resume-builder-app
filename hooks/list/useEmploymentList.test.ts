import { renderHookWithProviders } from "@/test/redux";
import useEmploymentList from "./useEmploymentList";
import { createMockEmployment, createMultipleMockItems } from "@/test/mocks";
import { act, waitFor } from "@testing-library/react";
import { Employment } from "@prisma/client";
import { deleteEmployment, setSortOrders } from "@/lib/client/employment";
import { faker } from "@faker-js/faker";

jest.mock('@/lib/client/employment');
console.error = jest.fn();

const mockDeleteEmployment = jest.mocked(deleteEmployment);
const mockSetSortOrders = jest.mocked(setSortOrders);
const employments = createMultipleMockItems(createMockEmployment, 5);

describe('useEmploymentListHook', () => {
    it('Should do nothing if no items are passed', () => {
        const { result, store } = renderHookWithProviders(() => useEmploymentList());

        expect(result.current.items).toEqual([]);
        expect(store.getState().employment.employments).toBeNull();
    })
    it('Should store the initial items in state', () => {
        const { result, rerender, store } = renderHookWithProviders(({ initialItems }: { initialItems?: Employment[]}) => useEmploymentList({ initialItems }), {
            initialProps: { initialItems: employments }
        });
        
        expect(result.current.items).toEqual(employments);
        expect(store.getState().employment.employments).toEqual(employments);

        act(() => {
            rerender({ initialItems: createMultipleMockItems(createMockEmployment, 3) })
        })

        expect(result.current.items).toEqual(employments);
        expect(store.getState().employment.employments).toEqual(employments);
    })
    it('Should successfully remove an item', async () => {
        const { result, store } = renderHookWithProviders(() => useEmploymentList({ initialItems: employments }));
        
        expect(result.current.deleting).toBeFalsy();

        const deletedItem = employments[2];
        act(() => {
            result.current.remove(deletedItem);
        })

        await waitFor(() => {
            expect(result.current.deleting).toBeTruthy();
            expect(mockDeleteEmployment).toHaveBeenCalledWith(deletedItem.id);
        })
        
        expect(result.current.items.includes(deletedItem)).toBeFalsy();
        expect(store.getState().employment.employments?.includes(deletedItem)).toBeFalsy();
    })
    it('Should handle errors when removing an item', async () => {
        const error = new Error(faker.lorem.sentence());
        mockDeleteEmployment.mockRejectedValueOnce(error);
        const { result, store } = renderHookWithProviders(() => useEmploymentList({ initialItems: employments }));

        const deletedItem = employments[3];
        act(() => {
            result.current.remove(deletedItem);
        })

        await waitFor(() => {
            expect(console.error).toHaveBeenCalledWith(error);
        })

        expect(result.current.items.includes(deletedItem)).toBeTruthy();
        expect(store.getState().employment.employments?.includes(deletedItem)).toBeTruthy();
    })
    it('Should return editing state', async () => {
        const { result } = renderHookWithProviders(() => useEmploymentList());

        expect(result.current.editing).toBeFalsy();

        act(() => {
            result.current.setEditing(true);
        })

        await waitFor(() => expect(result.current.editing).toBeTruthy())
    })
    it('Should save a new sort order', async () => {
        const { result, store } = renderHookWithProviders(() => useEmploymentList({ initialItems: employments }));
        
        const sortableItems = [...employments];
        expect(sortableItems[2].order).toEqual(3);
        expect(sortableItems[4].order).toEqual(5);

        sortableItems[2] = {...sortableItems[2], order: 5};
        sortableItems[4] = {...sortableItems[4], order: 3};

        act(() => {
            result.current.saveSortOrder(sortableItems);
        })

        await waitFor(() => {
            expect(mockSetSortOrders).toHaveBeenCalledWith(sortableItems)
        })

        expect(result.current.items[2].order).toEqual(5);
        expect(result.current.items[4].order).toEqual(3);
        expect(store.getState().employment.employments[2].order).toEqual(5);
        expect(store.getState().employment.employments[4].order).toEqual(3);
    })
})