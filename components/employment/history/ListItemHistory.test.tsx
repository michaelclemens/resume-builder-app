import { fireEvent, render, waitFor } from "@testing-library/react";
import { createMockHistory } from "@/test/mocks";
import { ButtonType } from "@/types/list";
import { SectionForm } from "../../form";
import { getDisplayDateFromDate } from "@/util/date";
import ListItemHistory from "./ListItemHistory";
import { SectionEnums } from "@/types/section";

jest.mock('@/components/form/SectionForm');
jest.mock('@/components/list/LoadingOverlay', () => () => <div>Loading</div>)

const remove = jest.fn();
const setEditing = jest.fn();
const onSave = jest.fn();
const mockSectionForm = jest.mocked(SectionForm);

const history = createMockHistory();

const getListItemComponent = ({ editing = false, deleting = false } = {}) => (
    <ListItemHistory 
        item={history} 
        remove={remove} 
        setEditing={setEditing}
        onSave={onSave}
        editing={editing} 
        deleting={deleting}
    />
);
const renderComponent = (options = {}) => (
    render(getListItemComponent(options))
);

describe('ListItemHistoryComponent', () => {
    it('Should render an employment history', () => {
        const { getByText } = renderComponent();

        expect(getByText(history.title)).toBeInTheDocument();
        expect(getByText(new RegExp(
            `${getDisplayDateFromDate(history.startDate)} to ${getDisplayDateFromDate(history.endDate ?? new Date())}`
        ))).toBeInTheDocument();
    })
    it('Should render edit and delete buttons', () => {
        const { getByTitle } = renderComponent();

        expect(getByTitle(new RegExp(ButtonType.edit, 'i'))).toBeInTheDocument();
        expect(getByTitle(new RegExp(ButtonType.delete, 'i'))).toBeInTheDocument();
    })
    it('Should be able to delete', async () => {
        const { getByTitle } = renderComponent();

        fireEvent.click(getByTitle(new RegExp(ButtonType.delete, 'i')));

        await waitFor(() => expect(remove).toHaveBeenCalledWith(history));
    })
    it('Should display loading overlay when deleting', () => {
        const { getByText } = renderComponent({ deleting: true });

        expect(getByText(/loading/i)).toBeInTheDocument();
    })
    it('Should show form when editing', () => {
        const { rerender, getByTitle } = renderComponent();

        expect(mockSectionForm).not.toHaveBeenCalled();

        fireEvent.click(getByTitle(new RegExp(ButtonType.edit, 'i')));
        rerender(getListItemComponent({ editing: true }));

        expect(setEditing).toHaveBeenCalledWith(true);
        expect(mockSectionForm).toHaveBeenCalledWith({ 
            sectionType: SectionEnums.employmentHistory,
            parentId: history.employmentId, 
            item: history,
            onSave
        }, expect.anything());
    })
})