import { renderHookWithProviders } from "@/test/redux";
import useSkillList from "./useSkillList";
import { createMockSkill, createMultipleMockItems } from "@/test/mocks";
import { act, waitFor } from "@testing-library/react";
import { Skill } from "@prisma/client";
import { deleteSkill, setSortOrders } from "@/lib/client/skill";
import { faker } from "@faker-js/faker";

jest.mock('@/lib/client/skill');
console.error = jest.fn();

const mockDeleteSkill = jest.mocked(deleteSkill);
const mockSetSortOrders = jest.mocked(setSortOrders);
const skills = createMultipleMockItems(createMockSkill, 5);

describe('useSkillListHook', () => {
    it('Should do nothing if no items are passed', () => {
        const { result, store } = renderHookWithProviders(() => useSkillList());

        expect(result.current.items).toEqual([]);
        expect(store.getState().skill.skills).toBeNull();
    })
    it('Should store the initial items in state', () => {
        const { result, rerender, store } = renderHookWithProviders(({ initialItems }: { initialItems?: Skill[]}) => useSkillList({ initialItems }), {
            initialProps: { initialItems: skills }
        });
        
        expect(result.current.items).toEqual(skills);
        expect(store.getState().skill.skills).toEqual(skills);

        act(() => {
            rerender({ initialItems: createMultipleMockItems(createMockSkill, 3) })
        })

        expect(result.current.items).toEqual(skills);
        expect(store.getState().skill.skills).toEqual(skills);
    })
    it('Should successfully remove an item', async () => {
        const { result, store } = renderHookWithProviders(() => useSkillList({ initialItems: skills }));
        
        expect(result.current.deleting).toBeFalsy();

        const deletedItem = skills[2];
        act(() => {
            result.current.remove(deletedItem);
        })

        await waitFor(() => {
            expect(result.current.deleting).toBeTruthy();
            expect(mockDeleteSkill).toHaveBeenCalledWith(deletedItem.id);
        })
        
        expect(result.current.items.includes(deletedItem)).toBeFalsy();
        expect(store.getState().skill.skills?.includes(deletedItem)).toBeFalsy();
    })
    it('Should handle errors when removing an item', async () => {
        const error = new Error(faker.lorem.sentence());
        mockDeleteSkill.mockRejectedValueOnce(error);
        const { result, store } = renderHookWithProviders(() => useSkillList({ initialItems: skills }));

        const deletedItem = skills[3];
        act(() => {
            result.current.remove(deletedItem);
        })

        await waitFor(() => {
            expect(console.error).toHaveBeenCalledWith(error);
        })

        expect(result.current.items.includes(deletedItem)).toBeTruthy();
        expect(store.getState().skill.skills?.includes(deletedItem)).toBeTruthy();
    })
    it('Should return editing state', async () => {
        const { result } = renderHookWithProviders(() => useSkillList());

        expect(result.current.editing).toBeFalsy();

        act(() => {
            result.current.setEditing(true);
        })

        await waitFor(() => expect(result.current.editing).toBeTruthy())
    })
    it('Should save a new sort order', async () => {
        const { result, store } = renderHookWithProviders(() => useSkillList({ initialItems: skills }));
        
        const sortableItems = [...skills];
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
        expect(store.getState().skill.skills[2].order).toEqual(5);
        expect(store.getState().skill.skills[4].order).toEqual(3);
    })
})