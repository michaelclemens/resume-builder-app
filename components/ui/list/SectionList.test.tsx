import { faker } from "@faker-js/faker";
import { createMockHistory, createMockStrength, createMultipleMockItems } from "@/test/mocks";
import { ListItemType, ListSectionType, SectionEnums } from "@/types/section";
import SectionList, { defaultEmptyMessage } from "./SectionList";
import SectionListItem from "./SectionListItem";
import { renderWithProviders } from "@/test/redux";

jest.mock('@/components/list/SectionListItem');

const useSectionListHook = jest.fn();
const saveSortOrder = jest.fn();
const mockSectionListItem = jest.mocked(SectionListItem);

function renderComponent(
    { sectionType = SectionEnums.employment, initialItems = [], parentId, emptyText }: 
    { sectionType?: ListSectionType, initialItems?: ListItemType[], parentId?: string, emptyText?: string } = {}
) {
    useSectionListHook.mockImplementation(({ initialItems }) => ({ items: initialItems, saveSortOrder }))
    return (renderWithProviders(
        <SectionList
            sectionType={sectionType}
            initialItems={initialItems}
            parentId={parentId}
            emptyText={emptyText}
        />
    ))
}

describe('SectionListComponent', () => {
    it('Should render a default empty message', () => {
        const { getByText } = renderComponent();

        expect(getByText(defaultEmptyMessage)).toBeInTheDocument();
        expect(mockSectionListItem).not.toHaveBeenCalled();
    })
    it('Should render a custom empty message', () => {
        const emptyText = faker.lorem.sentence();
        const { getByText } = renderComponent({ emptyText });

        expect(getByText(emptyText)).toBeInTheDocument();
        expect(mockSectionListItem).not.toHaveBeenCalled();
    })
    it('Should render a list of items', () => {
        const strengths = createMultipleMockItems(createMockStrength, 5);
        const { queryByText } = renderComponent({ sectionType: SectionEnums.strength, initialItems: strengths });

        expect(queryByText(defaultEmptyMessage)).not.toBeInTheDocument();

        strengths.forEach((strength, index) => (
            expect(mockSectionListItem).toHaveBeenNthCalledWith(index + 1, {
                sectionType: SectionEnums.strength,
                item: strength,
                parentId: undefined
            }, expect.anything())
        ))
    })
    it('Should pass any parentId to the list item', () => {
        const histories = createMultipleMockItems(createMockHistory, 3);
        const employmentId = histories[0].employmentId;
        renderComponent({ sectionType: SectionEnums.employmentHistory, initialItems: histories, parentId: employmentId });

        histories.forEach((history, index) => (
            expect(mockSectionListItem).toHaveBeenNthCalledWith(index + 1, {
                sectionType: SectionEnums.employmentHistory,
                item: history,
                parentId: employmentId
            }, expect.anything())
        ))
    })
})