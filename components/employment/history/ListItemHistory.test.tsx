import { fireEvent, render, waitFor } from "@testing-library/react";
import { createMockHistory } from "@/test/mocks";
import { ButtonType } from "@/types/list";
import { Form } from "../../form";
import { getDisplayDateFromDate } from "@/util/date";
import ListItemHistory from "./ListItemHistory";

jest.mock('@/components/form/Form');
jest.mock('@/components/list/LoadingOverlay', () => () => <div>Loading</div>)

const remove = jest.fn();
const setEditing = jest.fn();
const onSave = jest.fn();

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

        expect(Form).not.toHaveBeenCalled();

        fireEvent.click(getByTitle(new RegExp(ButtonType.edit, 'i')));
        rerender(getListItemComponent({ editing: true }));

        expect(setEditing).toHaveBeenCalledWith(true);
        expect(Form).toHaveBeenCalledWith({ 
            parentId: history.employmentId, 
            useFormHook: expect.any(Function),
            formBody: expect.any(Function),
            item: history,
            onSave
        }, expect.anything());
    })
})