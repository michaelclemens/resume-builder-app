import { render } from "@testing-library/react"
import ListStrengths from "./ListStrengths"
import { SortableVerticalList } from "@/components/list";
import { createMockStrengths } from "@/test/mocks";

const useStrengthList = jest.fn();
jest.mock('@/hooks/list', () => ({ useStrengthList: () => useStrengthList()}));
jest.mock('@/components/list');
jest.mock('@/util/sort');

describe('ListStrengthsComponent', () => {
    it('Should render no strengths', () => {
        useStrengthList.mockReturnValueOnce({ strengths: [], saveSortOrder: jest.fn()});

        const { getByText } = render(<ListStrengths strengths={[]}/>);

        expect(getByText(/No Strengths/i)).toBeInTheDocument();
    })
    it('Should render strengths list', () => {
        const strengths = createMockStrengths(2);
        const saveSortOrder = jest.fn();
        useStrengthList.mockReturnValueOnce({ strengths, saveSortOrder });

        render(<ListStrengths strengths={strengths}/>);

        expect(SortableVerticalList).toHaveBeenCalledWith(expect.objectContaining({ items: strengths }), expect.anything());
    })
})