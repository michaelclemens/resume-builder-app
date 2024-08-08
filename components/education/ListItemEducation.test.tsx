import { fireEvent, render, waitFor } from "@testing-library/react";
import { createMockEducation } from "@/test/mocks";
import { ButtonType } from "@/types/list";
import { SectionForm } from "../form";
import ListItemEducation from "./ListItemEducation";
import { getDisplayDateFromDate } from "@/util/date";
import { SectionEnums } from "@/types/section";

jest.mock('@/components/form/SectionForm');
jest.mock('@/components/list/LoadingOverlay', () => () => <div>Loading</div>)

const remove = jest.fn();
const setEditing = jest.fn();
const onSave = jest.fn();
const mockSectionForm = jest.mocked(SectionForm);

const education = createMockEducation();

const getListItemComponent = ({ editing = false, deleting = false } = {}) => (
    <ListItemEducation 
        item={education} 
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

describe('ListItemEducationComponent', () => {
    it('Should render a education', () => {
        const { getByText } = renderComponent();

        expect(getByText(new RegExp(`${education.degree} - ${education.school}`, 'i'))).toBeInTheDocument();
        expect(getByText(new RegExp(
            `${getDisplayDateFromDate(education.startDate)} to ${getDisplayDateFromDate(education.endDate ?? new Date())}`
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

        await waitFor(() => expect(remove).toHaveBeenCalledWith(education));
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
            sectionType: SectionEnums.education,
            parentId: education.resumeId, 
            item: education,
            onSave
        }, expect.anything());
    })
})