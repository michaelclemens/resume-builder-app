import { renderHookWithProviders } from "@/test/redux";
import useStrengthList from "./useStrengthList";
import { createMockStrength, createMultipleMockItems } from "@/test/mocks";
import { act, waitFor } from "@testing-library/react";
import { Strength } from "@prisma/client";
import { deleteStrength, setSortOrders } from "@/lib/client/strength";
import { faker } from "@faker-js/faker";

jest.mock('@/lib/client/strength');
console.error = jest.fn();

const mockDeleteStrength = jest.mocked(deleteStrength);
const mockSetSortOrders = jest.mocked(setSortOrders);
const strengths = createMultipleMockItems(createMockStrength, 5);

describe('useStrengthListHook', () => {
    it('Should do nothing if no items are passed', () => {
        const { result, store } = renderHookWithProviders(() => useStrengthList());

        expect(result.current.items).toEqual([]);
        expect(store.getState().strength.strengths).toBeNull();
    })
    it('Should store the initial items in state', () => {
        const { result, rerender, store } = renderHookWithProviders(({ initialItems }: { initialItems?: Strength[]}) => useStrengthList({ initialItems }), {
            initialProps: { initialItems: strengths }
        });
        
        expect(result.current.items).toEqual(strengths);
        expect(store.getState().strength.strengths).toEqual(strengths);

        act(() => {
            rerender({ initialItems: createMultipleMockItems(createMockStrength, 3) })
        })

        expect(result.current.items).toEqual(strengths);
        expect(store.getState().strength.strengths).toEqual(strengths);
    })
    it('Should successfully remove an item', async () => {
        const { result, store } = renderHookWithProviders(() => useStrengthList({ initialItems: strengths }));
        
        expect(result.current.deleting).toBeFalsy();

        const deletedItem = strengths[2];
        act(() => {
            result.current.remove(deletedItem);
        })

        await waitFor(() => {
            expect(result.current.deleting).toBeTruthy();
            expect(mockDeleteStrength).toHaveBeenCalledWith(deletedItem.id);
        })
        
        expect(result.current.items.includes(deletedItem)).toBeFalsy();
        expect(store.getState().strength.strengths?.includes(deletedItem)).toBeFalsy();
    })
    it('Should handle errors when removing an item', async () => {
        const error = new Error(faker.lorem.sentence());
        mockDeleteStrength.mockRejectedValueOnce(error);
        const { result, store } = renderHookWithProviders(() => useStrengthList({ initialItems: strengths }));

        const deletedItem = strengths[3];
        act(() => {
            result.current.remove(deletedItem);
        })

        await waitFor(() => {
            expect(console.error).toHaveBeenCalledWith(error);
        })

        expect(result.current.items.includes(deletedItem)).toBeTruthy();
        expect(store.getState().strength.strengths?.includes(deletedItem)).toBeTruthy();
    })
    it('Should return editing state', async () => {
        const { result } = renderHookWithProviders(() => useStrengthList());

        expect(result.current.editing).toBeFalsy();

        act(() => {
            result.current.setEditing(true);
        })

        await waitFor(() => expect(result.current.editing).toBeTruthy())
    })
    it('Should save a new sort order', async () => {
        const { result, store } = renderHookWithProviders(() => useStrengthList({ initialItems: strengths }));
        
        const sortableItems = [...strengths];
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
        expect(store.getState().strength.strengths[2].order).toEqual(5);
        expect(store.getState().strength.strengths[4].order).toEqual(3);
    })
})