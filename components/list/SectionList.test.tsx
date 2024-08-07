import { render } from "@testing-library/react"
import List, { defaultEmptyMessage } from "./SectionList"
import { SortableItemType } from "@/types/hook";
import ListItem from "./SectionListItem";
import { faker } from "@faker-js/faker";
import { createMockHistory, createMockStrength, createMultipleMockItems } from "@/test/mocks";
import { EmploymentHistory, Strength } from "@prisma/client";

jest.mock('@/components/list/ListItem');

const useListHook = jest.fn();
const itemComponent = jest.fn();
const saveSortOrder = jest.fn();
const mockListItem = jest.mocked(ListItem);

function renderComponent<ItemType extends SortableItemType>({ initialItems = [], parentId, emptyText }: { initialItems?: ItemType[], parentId?: string, emptyText?: string } = {}) {
    useListHook.mockImplementation(({ initialItems }) => ({ items: initialItems, saveSortOrder }))
    return (render(
        <List
            useListHook={useListHook}
            itemComponent={itemComponent}
            initialItems={initialItems}
            parentId={parentId}
            emptyText={emptyText}
        />
    ))
}

describe('ListComponent', () => {
    it('Should render a default empty message', () => {
        const { getByText } = renderComponent();

        expect(getByText(defaultEmptyMessage)).toBeInTheDocument();
        expect(mockListItem).not.toHaveBeenCalled();
    })
    it('Should render a custom empty message', () => {
        const emptyText = faker.lorem.sentence();
        const { getByText } = renderComponent({ emptyText });

        expect(getByText(emptyText)).toBeInTheDocument();
        expect(mockListItem).not.toHaveBeenCalled();
    })
    it('Should render a list of items', () => {
        const strengths = createMultipleMockItems(createMockStrength, 5);
        const { queryByText } = renderComponent<Strength>({ initialItems: strengths });

        expect(queryByText(defaultEmptyMessage)).not.toBeInTheDocument();

        strengths.forEach((strength, index) => (
            expect(mockListItem).toHaveBeenNthCalledWith(index + 1, {
                item: strength,
                useListHook,
                itemComponent,
                parentId: undefined
            }, expect.anything())
        ))
    })
    it('Should pass any parentId to the list item', () => {
        const histories = createMultipleMockItems(createMockHistory, 3);
        const employmentId = histories[0].employmentId;
        renderComponent<EmploymentHistory>({ initialItems: histories, parentId: employmentId });

        histories.forEach((history, index) => (
            expect(mockListItem).toHaveBeenNthCalledWith(index + 1, {
                item: history,
                useListHook,
                itemComponent,
                parentId: employmentId
            }, expect.anything())
        ))
    })
})