import { renderHookWithProviders } from "@/test/redux";
import useEducationList from "./useEducationList";
import { createMockEducation, createMultipleMockItems } from "@/test/mocks";
import { act, waitFor } from "@testing-library/react";
import { Education } from "@prisma/client";
import { deleteEducation, setSortOrders } from "@/lib/client/education";
import { faker } from "@faker-js/faker";

jest.mock('@/lib/client/education');
console.error = jest.fn();

const mockDeleteEducation = jest.mocked(deleteEducation);
const mockSetSortOrders = jest.mocked(setSortOrders);
const educations = createMultipleMockItems(createMockEducation, 5);

describe('useEducationListHook', () => {
    it('Should do nothing if no items are passed', () => {
        const { result, store } = renderHookWithProviders(() => useEducationList());

        expect(result.current.items).toEqual([]);
        expect(store.getState().education.items).toBeNull();
    })
    it('Should store the initial items in state', () => {
        const { result, rerender, store } = renderHookWithProviders(({ initialItems }: { initialItems?: Education[]}) => useEducationList({ initialItems }), {
            initialProps: { initialItems: educations }
        });
        
        expect(result.current.items).toEqual(educations);
        expect(store.getState().education.items).toEqual(educations);

        act(() => {
            rerender({ initialItems: createMultipleMockItems(createMockEducation, 3) })
        })

        expect(result.current.items).toEqual(educations);
        expect(store.getState().education.items).toEqual(educations);
    })
    it('Should successfully remove an item', async () => {
        const { result, store } = renderHookWithProviders(() => useEducationList({ initialItems: educations }));
        
        expect(result.current.deleting).toBeFalsy();

        const deletedItem = educations[2];
        act(() => {
            result.current.remove(deletedItem);
        })

        await waitFor(() => {
            expect(result.current.deleting).toBeTruthy();
            expect(mockDeleteEducation).toHaveBeenCalledWith(deletedItem.id);
        })
        
        expect(result.current.items.includes(deletedItem)).toBeFalsy();
        expect(store.getState().education.items?.includes(deletedItem)).toBeFalsy();
    })
    it('Should handle errors when removing an item', async () => {
        const error = new Error(faker.lorem.sentence());
        mockDeleteEducation.mockRejectedValueOnce(error);
        const { result, store } = renderHookWithProviders(() => useEducationList({ initialItems: educations }));

        const deletedItem = educations[3];
        act(() => {
            result.current.remove(deletedItem);
        })

        await waitFor(() => {
            expect(console.error).toHaveBeenCalledWith(error);
        })

        expect(result.current.items.includes(deletedItem)).toBeTruthy();
        expect(store.getState().education.items?.includes(deletedItem)).toBeTruthy();
    })
    it('Should return editing state', async () => {
        const { result } = renderHookWithProviders(() => useEducationList());

        expect(result.current.editing).toBeFalsy();

        act(() => {
            result.current.setEditing(true);
        })

        await waitFor(() => expect(result.current.editing).toBeTruthy())
    })
    it('Should save a new sort order', async () => {
        const { result, store } = renderHookWithProviders(() => useEducationList({ initialItems: educations }));
        
        const sortableItems = [...educations];
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
        expect(store.getState().education.items[2].order).toEqual(5);
        expect(store.getState().education.items[4].order).toEqual(3);
    })
})