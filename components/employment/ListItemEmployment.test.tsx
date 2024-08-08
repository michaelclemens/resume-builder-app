import { fireEvent, render, waitFor } from "@testing-library/react";
import { createMockEmploymentWithHistory } from "@/test/mocks";
import { ButtonType } from "@/types/list";
import { SectionForm } from "../form";
import ListItemEmployment from "./ListItemEmployment";
import HistorySection from "./history/HistorySection";
import { SectionEnums } from "@/types/section";

jest.mock('@/components/form/SectionForm');
jest.mock('@/components/employment/history/HistorySection');
jest.mock('@/components/list/LoadingOverlay', () => () => <div>Loading</div>)

const remove = jest.fn();
const setEditing = jest.fn();
const onSave = jest.fn();
const mockSectionForm = jest.mocked(SectionForm);
const mockHistorySection = jest.mocked(HistorySection);

const employment = createMockEmploymentWithHistory();

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

        expect(mockSectionForm).not.toHaveBeenCalled();

        fireEvent.click(getByTitle(new RegExp(ButtonType.edit, 'i')));
        rerender(getListItemComponent({ editing: true }));

        expect(setEditing).toHaveBeenCalledWith(true);
        expect(mockSectionForm).toHaveBeenCalledWith(expect.objectContaining({ 
            sectionType: SectionEnums.employment,
            parentId: employment.resumeId,
            item: employment,
            onSave
        }), expect.anything());
    })
})