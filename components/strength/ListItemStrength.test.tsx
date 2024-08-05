import { fireEvent, render, waitFor } from "@testing-library/react";
import ListItemStrength from "./ListItemStrength";
import { createMockStrength } from "@/test/mocks";
import { ButtonType } from "@/types/list";
import { Form } from "../form";

jest.mock('@/components/form/Form');
jest.mock('@/components/list/LoadingOverlay', () => () => <div>Loading</div>)

const remove = jest.fn();
const setEditing = jest.fn();
const onSave = jest.fn();

const strength = createMockStrength();

const getListItemComponent = ({ editing = false, deleting = false } = {}) => (
    <ListItemStrength 
        item={strength} 
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

describe('ListItemStrengthComponent', () => {
    it('Should render a strength', () => {
        const { getByText } = renderComponent();

        expect(getByText(strength.name)).toBeInTheDocument();
    })
    it('Should render edit and delete buttons', () => {
        const { getByTitle } = renderComponent();

        expect(getByTitle(new RegExp(ButtonType.edit, 'i'))).toBeInTheDocument();
        expect(getByTitle(new RegExp(ButtonType.delete, 'i'))).toBeInTheDocument();
    })
    it('Should be able to delete', async () => {
        const { getByTitle } = renderComponent();

        fireEvent.click(getByTitle(new RegExp(ButtonType.delete, 'i')));

        await waitFor(() => expect(remove).toHaveBeenCalledWith(strength));
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
            parentId: strength.resumeId, 
            useFormHook: expect.any(Function),
            formBody: expect.any(Function),
            item: strength,
            onSave
        }, expect.anything());
    })
})