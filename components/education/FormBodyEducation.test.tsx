import { waitFor, fireEvent, act } from "@testing-library/react";
import FormBodyEducation from "./FormBodyEducation";
import { createMockEducation, renderFormBody } from "@/test/mocks";
import { Education } from "@prisma/client";
import { EducationSchema } from "@/types/form";
import { getDisplayDateFromDate } from "@/util/date";
import { disabledClass } from "../form/RichTextEditor";
import { getDefaultValuesEducation, richTextEditorClassName } from "@/util/form";

const education = createMockEducation();
const onSave = jest.fn();
console.error = jest.fn();

const renderComponent = ({ education }: { education?: Education } = {}) => (
    renderFormBody({
        component: FormBodyEducation,
        editing: !!education,
        defaultValues: getDefaultValuesEducation(education),
        schema: EducationSchema,
        onSave
    })
)

describe('FormBodyEducationComponent', () => {
    it('Should render create new form', async () => {
        const { getByRole, getByLabelText } = renderComponent();

        expect(getByRole('textbox', { name: /school/i })).toHaveValue('');
        expect(getByRole('textbox', { name: /city/i })).toHaveValue('');
        expect(getByRole('textbox', { name: /degree/i })).toHaveValue('');
        expect(getByLabelText(/startdate/i)).toHaveValue('');
        expect(getByLabelText(/enddate/i)).toHaveValue('');

        await waitFor(() => {
            expect(getByLabelText(/description/i).querySelector(`.${richTextEditorClassName}`)).toHaveTextContent('');
        })
        
        expect(getByRole('button', { name: /add education/i })).toBeInTheDocument();
    })
    it('Should render an update form', async () => {
        const { getByRole, getByLabelText } = renderComponent({ education });

        expect(getByRole('textbox', { name: /school/i })).toHaveValue(education.school);
        expect(getByRole('textbox', { name: /city/i })).toHaveValue(education.city);
        expect(getByRole('textbox', { name: /degree/i })).toHaveValue(education.degree);
        expect(getByLabelText(/startdate/i)).toHaveValue(getDisplayDateFromDate(education.startDate));
        expect(getByLabelText(/enddate/i)).toHaveValue(getDisplayDateFromDate(education.endDate));

        await waitFor(() => {
            expect(getByLabelText(/description/i).querySelector(`.${richTextEditorClassName}`)).toHaveTextContent(education.description);
        })

        expect(getByRole('button', { name: /save/i })).toBeInTheDocument();
    })
    it('Should display errros for required fields', async () => {
        const { getAllByRole, getByRole, getByText, rerenderHook } = renderComponent();

        expect(getByRole('textbox', { name: /school/i })).toBeRequired();
        expect(getByRole('textbox', { name: /degree/i })).toBeRequired();

        fireEvent.click(getByRole('button', { name: /add education/i }));
  
        await waitFor(() => {
            rerenderHook();
            expect(onSave).not.toHaveBeenCalled();
            expect(getAllByRole("alert")).toHaveLength(3);
        })

        expect(getByText(/school is required/i)).toBeInTheDocument();
        expect(getByText(/degree is required/i)).toBeInTheDocument();
        expect(getByText(/invalid date/i)).toBeInTheDocument();
    })
    it('Should disable form elements when submitting', async () => {
        const { getByRole, getByLabelText, rerenderHook } = renderComponent();

        fireEvent.click(getByRole('button', { name: /add education/i }));

        await waitFor(() => {
            rerenderHook();
        })

        expect(getByRole('textbox', { name: /school/i })).toBeDisabled();
        expect(getByRole('textbox', { name: /city/i })).toBeDisabled();
        expect(getByRole('textbox', { name: /degree/i })).toBeDisabled();
        expect(getByLabelText(/startdate/i)).toBeDisabled();
        expect(getByLabelText(/enddate/i)).toBeDisabled();
        expect(getByLabelText(/description/i)).toHaveClass(disabledClass);
        expect(getByRole('button', { name: /add education/i })).toBeDisabled();
    })
    it('Should successfully submit form with new values', async () => {
        const { getByRole, getByLabelText, rerenderHook } = renderComponent({ education });

        const newEducation = createMockEducation();
        fireEvent.change(getByRole('textbox', { name: /school/i }), { target: { value: newEducation.school }});
        fireEvent.change(getByRole('textbox', { name: /city/i }), { target: { value: newEducation.city }});
        fireEvent.change(getByRole('textbox', { name: /degree/i }), { target: { value: newEducation.degree }});
        fireEvent.change(getByLabelText(/startdate/i), { target: { value: getDisplayDateFromDate(newEducation.startDate) }});
        fireEvent.change(getByLabelText(/enddate/i), { target: { value: getDisplayDateFromDate(newEducation.endDate ?? undefined) }});
       
        await waitFor(async () => {
            fireEvent.change(getByLabelText(/description/i).querySelector(`.${richTextEditorClassName} p`), { target: { textContent: newEducation.description }});
        })
       
        fireEvent.click(getByRole('button', { name: /save/i }));

        await waitFor(() => {
            rerenderHook();
            expect(onSave).toHaveBeenCalledWith(expect.objectContaining({
                school: newEducation.school,
                city: newEducation.city,
                degree: newEducation.degree,
                startDate: getDisplayDateFromDate(newEducation.startDate),
                endDate: newEducation.endDate && getDisplayDateFromDate(newEducation.endDate),
                description: expect.stringContaining(newEducation.description ?? '')
            }), expect.anything());
        })
    })
})