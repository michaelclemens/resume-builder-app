import { createMockHistory } from "@/test/mocks"
import HistorySection from "./HistorySection";
import { fireEvent, render } from "@testing-library/react";
import { List } from "@/components/list";
import { SectionForm } from "@/components/form";
import { SectionEnums } from "@/types/section";

jest.mock('@/components/list');
jest.mock('@/components/form');

const mockListComponent = jest.mocked(List);
const mockFormComponent = jest.mocked(SectionForm);

const history = createMockHistory();

describe('HistorySectionComponent', () => {
    it('Should render initially collapsed', () => {
        const { getByText, getByTitle, queryByTitle } = render(<HistorySection employmentId={history.employmentId} histories={[history]} />);
    
        expect(getByText(/employment history/i)).toBeInTheDocument();
        expect(getByTitle(/open/i)).toBeInTheDocument();
        expect(queryByTitle(/close/i)).not.toBeInTheDocument();
        expect(mockListComponent).not.toHaveBeenCalled();
        expect(mockFormComponent).not.toHaveBeenCalled();
    })
    it('Should show the list and form components when opened', () => {
        const { getByTitle, queryByTitle } = render(<HistorySection employmentId={history.employmentId} histories={[history]} />);

        fireEvent.click(getByTitle(/open/i));

        expect(queryByTitle(/open/i)).not.toBeInTheDocument();
        expect(getByTitle(/close/i)).toBeInTheDocument();
        expect(mockListComponent).toHaveBeenCalledWith({
            sectionType: SectionEnums.employmentHistory,
            parentId: history.employmentId,
            initialItems: [history],
        }, expect.anything());
        expect(mockFormComponent).toHaveBeenCalledWith({
            sectionType: SectionEnums.employmentHistory,
            parentId: history.employmentId,
        }, expect.anything());
    })
})