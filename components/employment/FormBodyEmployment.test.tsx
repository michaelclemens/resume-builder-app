import { waitFor, fireEvent } from "@testing-library/react";
import { createMockEmployment, renderFormBody } from "@/test/mocks";
import { Employment } from "@prisma/client";
import { EmploymentSchema } from "@/types/form";
import FormBodyEmployment from "./FormBodyEmployment";
import { getDefaultValuesEmployment } from "@/util/form";

const employment = createMockEmployment();
const onSave = jest.fn();

const renderComponent = ({ employment }: { employment?: Employment } = {}) => (
    renderFormBody({
        component: FormBodyEmployment,
        editing: !!employment,
        defaultValues: getDefaultValuesEmployment(employment),
        schema: EmploymentSchema,
        onSave
    })
)

describe('FormBodyEmploymentComponent', () => {
    it('Should render create new form', () => {
        const { getByRole } = renderComponent();

        expect(getByRole('textbox', { name: /employer/i })).toHaveValue('');
        expect(getByRole('textbox', { name: /city/i })).toHaveValue('');
        expect(getByRole('button', { name: /add employment/i })).toBeInTheDocument();
    })
    it('Should render an update form', () => {
        const { getByRole } = renderComponent({ employment });

        expect(getByRole('textbox', { name: /employer/i })).toHaveValue(employment.employer);
        expect(getByRole('textbox', { name: /city/i })).toHaveValue(employment.city);
        expect(getByRole('button', { name: /save/i })).toBeInTheDocument();
    })
    it('Should display errros for required fields', async () => {
        const { getAllByRole, getByRole, getByText, rerenderHook } = renderComponent();

        expect(getByRole('textbox', { name: /employer/i })).toBeRequired();

        fireEvent.click(getByRole('button', { name: /add employment/i }));
  
        await waitFor(() => {
            rerenderHook();
            expect(onSave).not.toHaveBeenCalled();
            expect(getAllByRole("alert")).toHaveLength(1);
            expect(getByText(/employer is required/i)).toBeInTheDocument();
        })
    })
    it('Should disable form elements when submitting', async () => {
        const { getByRole, rerenderHook } = renderComponent();

        fireEvent.click(getByRole('button', { name: /add employment/i }));

        await waitFor(() => {
            rerenderHook();
            expect(getByRole('textbox', { name: /employer/i })).toBeDisabled();
            expect(getByRole('textbox', { name: /city/i })).toBeDisabled();
            expect(getByRole('button', { name: /add employment/i })).toBeDisabled();
        })
    })
    it('Should successfully submit form with new values', async () => {
        const { getByRole, rerenderHook } = renderComponent({ employment });

        const newEmployment = createMockEmployment();
        fireEvent.change(getByRole('textbox', { name: /employer/i }), { target: { value: newEmployment.employer }});
        fireEvent.change(getByRole('textbox', { name: /city/i }), { target: { value: newEmployment.city }});
        fireEvent.click(getByRole('button', { name: /save/i }));

        await waitFor(() => {
            rerenderHook();
            expect(onSave).toHaveBeenCalledWith(expect.objectContaining({
                employer: newEmployment.employer,
                city: newEmployment.city,
            }), expect.anything());
        })
    })
})