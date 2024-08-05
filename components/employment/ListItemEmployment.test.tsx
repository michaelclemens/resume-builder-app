import { fireEvent, render, waitFor } from "@testing-library/react";
import { createMockEmployment, createMockHistory } from "@/test/mocks";
import { ButtonType } from "@/types/list";
import { Form } from "../form";
import ListItemEmployment from "./ListItemEmployment";
import HistorySection from "./history/HistorySection";

jest.mock('@/components/form/Form');
jest.mock('@/components/employment/history/HistorySection');
jest.mock('@/components/list/LoadingOverlay', () => () => <div>Loading</div>)

const remove = jest.fn();
const setEditing = jest.fn();
const onSave = jest.fn();
const mockHistorySection = jest.mocked(HistorySection);

const history = createMockHistory();
const employment = createMockEmployment([history]);

const getListItemComponent = ({ editing = false, deleting = false } = {}) => (
    <ListItemEmployment
        item={employment} 
        remove={remove} 
        setEditing={setEditing}
        onSave={onSave}
        editing={editing} 
        deleting={deleting}
    />
)
const renderComponent = (options = {}) => (
    render(getListItemComponent(options))
);

describe('ListItemEmploymentComponent', () => {
    it('Should render a employment', () => {
        const { getByText } = renderComponent();

        expect(getByText(employment.employer)).toBeInTheDocument();
        expect(getByText(employment.city)).toBeInTheDocument();
        expect(mockHistorySection).toHaveBeenCalledWith({ 
            employmentId: employment.id, 
            histories: employment.history
        }, expect.anything())
    })
    it('Should render edit and delete buttons', () => {
        const { getByTitle } = renderComponent();

        expect(getByTitle(new RegExp(ButtonType.edit, 'i'))).toBeInTheDocument();
        expect(getByTitle(new RegExp(ButtonType.delete, 'i'))).toBeInTheDocument();
    })
    it('Should be able to delete', async () => {
        const { getByTitle } = renderComponent();

        fireEvent.click(getByTitle(new RegExp(ButtonType.delete, 'i')));

        await waitFor(() => expect(remove).toHaveBeenCalledWith(employment));
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
        expect(Form).toHaveBeenCalledWith(expect.objectContaining({ 
            parentId: employment.resumeId,
            useFormHook: expect.any(Function),
            formBody: expect.any(Function),
            item: employment,
            onSave
        }), expect.anything());
    })
})