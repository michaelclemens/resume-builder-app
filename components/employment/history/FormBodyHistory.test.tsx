import { waitFor, fireEvent } from "@testing-library/react";
import { createMockHistory, renderFormBody } from "@/test/mocks";
import { EmploymentHistory } from "@prisma/client";
import { EmploymentHistorySchema } from "@/types/form";
import { getDisplayDateFromDate } from "@/util/date";
import { getDefaultValuesEmploymentHistory, richTextEditorClassName } from "@/util/form";
import FormBodyHistory from "./FormBodyHistory";
import { disabledClass } from "@/components/form/RichTextEditor";

const history = createMockHistory();
const onSave = jest.fn();
console.error = jest.fn();

const renderComponent = ({ history }: { history?: EmploymentHistory } = {}) => (
    renderFormBody({
        component: FormBodyHistory,
        editing: !!history,
        defaultValues: getDefaultValuesEmploymentHistory(history),
        schema: EmploymentHistorySchema,
        onSave
    })
)

describe('FormBodyHistoryComponent', () => {
    it('Should render create new form', async () => {
        const { getByRole, getByLabelText } = renderComponent();

        expect(getByRole('textbox', { name: /title/i })).toHaveValue('');
        await waitFor(() => {
            const descriptionEl = getByLabelText(/description/i).querySelector(`.${richTextEditorClassName}`);
            expect(getByLabelText(/startdate/i)).toHaveValue('');
            expect(getByLabelText(/enddate/i)).toHaveValue('');
            expect(descriptionEl).toHaveTextContent('');
        })
        expect(getByRole('button', { name: /add employment history/i })).toBeInTheDocument();
    })
    it('Should render an update form', async () => {
        const { getByRole, getByLabelText } = renderComponent({ history });

        expect(getByRole('textbox', { name: /title/i })).toHaveValue(history.title);
        await waitFor(() => {
            const descriptionEl = getByLabelText(/description/i).querySelector(`.${richTextEditorClassName}`);
            expect(getByLabelText(/startdate/i)).toHaveValue(getDisplayDateFromDate(history.startDate));
            expect(getByLabelText(/enddate/i)).toHaveValue(getDisplayDateFromDate(history.endDate));
            expect(descriptionEl).toHaveTextContent(history.description);
        })
        expect(getByRole('button', { name: /save/i })).toBeInTheDocument();
    })
    it('Should display errros for required fields', async () => {
        const { getAllByRole, getByLabelText, getByRole, getByText, rerenderHook } = renderComponent();

        expect(getByRole('textbox', { name: /title/i })).toBeRequired();
        expect(getByLabelText(/startdate/i)).toBeRequired();

        fireEvent.click(getByRole('button', { name: /add employment history/i }));
  
        await waitFor(() => {
            rerenderHook();
            expect(onSave).not.toHaveBeenCalled();
            expect(getAllByRole("alert")).toHaveLength(2);
            expect(getByText(/title is required/i)).toBeInTheDocument();
            expect(getByText(/invalid date/i)).toBeInTheDocument();
        })
    })
    it('Should disable form elements when submitting', async () => {
        const { getByRole, getByLabelText, rerenderHook } = renderComponent();

        fireEvent.click(getByRole('button', { name: /add employment history/i }));

        await waitFor(() => {
            rerenderHook();
            expect(getByRole('textbox', { name: /title/i })).toBeDisabled();
            expect(getByLabelText(/startdate/i)).toBeDisabled();
            expect(getByLabelText(/enddate/i)).toBeDisabled();
            expect(getByLabelText(/description/i)).toHaveClass(disabledClass);
            expect(getByRole('button', { name: /add employment history/i })).toBeDisabled();
        })
    })
    it('Should successfully submit form with new values', async () => {
        const { getByRole, getByLabelText, rerenderHook } = renderComponent({ history });

        const newHistory = createMockHistory();
        fireEvent.change(getByRole('textbox', { name: /title/i }), { target: { value: newHistory.title }});
        fireEvent.change(getByLabelText(/startdate/i), { target: { value: getDisplayDateFromDate(newHistory.startDate) }});
        fireEvent.change(getByLabelText(/enddate/i), { target: { value: getDisplayDateFromDate(newHistory.endDate ?? undefined) }});
       
        await waitFor(async () => {
            const descriptionContent = getByLabelText(/description/i).querySelector(`.${richTextEditorClassName} p`);
            fireEvent.change(descriptionContent, { target: { textContent: newHistory.description }});
        })
       
        fireEvent.click(getByRole('button', { name: /save/i }));

        await waitFor(() => {
            rerenderHook();
            expect(onSave).toHaveBeenCalledWith(expect.objectContaining({
                title: newHistory.title,
                startDate: getDisplayDateFromDate(newHistory.startDate),
                endDate: newHistory.endDate && getDisplayDateFromDate(newHistory.endDate),
                description: expect.stringContaining(newHistory.description ?? '')
            }), expect.anything());
        })
    })
})