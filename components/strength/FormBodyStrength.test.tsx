import FormBodyStrength from "./FormBodyStrength";
import { fireEvent, waitFor } from "@testing-library/react";
import { createMockStrength, renderFormBody } from "@/test/mocks";
import { Strength } from "@prisma/client";
import { StrengthSchema } from "@/types/form";
import { getDefaultValuesStrength } from "@/util/form";

const strength = createMockStrength();
const onSave = jest.fn();

const renderComponent = ({ strength }: { strength?: Strength } = {}) => (
    renderFormBody({
        component: FormBodyStrength,
        editing: !!strength,
        defaultValues: getDefaultValuesStrength(strength),
        schema: StrengthSchema,
        onSave
    })
)

describe('FormBodyStrengthComponent', () => {
    it('Should render create new form', () => {
        const { getByRole } = renderComponent();

        expect(getByRole('textbox', { name: /name/i })).toHaveValue("");
        expect(getByRole('button', { name: /add strength/i })).toBeInTheDocument();
    })
    it('Should render an update form', () => {
        const { getByRole } = renderComponent({ strength });

        expect(getByRole('textbox', { name: /name/i })).toHaveValue(strength.name);
        expect(getByRole('button', { name: /save/i })).toBeInTheDocument();
    })
    it('Should display errros for required fields', async () => {
        const { getAllByRole, getByRole, getByText, rerenderHook } = renderComponent();

        expect(getByRole('textbox', { name: /name/i })).toBeRequired();

        fireEvent.click(getByRole('button', { name: /add strength/i }));
  
        await waitFor(() => {
            rerenderHook();
            expect(onSave).not.toHaveBeenCalled();
            expect(getAllByRole("alert")).toHaveLength(1);
        })

        expect(getByText(/name is required/i)).toBeInTheDocument();
    })
    it('Should disable form elements when submitting', async () => {
        const { getByRole, rerenderHook } = renderComponent();

        fireEvent.click(getByRole('button', { name: /add strength/i }));

        await waitFor(() => {
            rerenderHook();
        })

        expect(getByRole('textbox', { name: /name/i })).toBeDisabled();
        expect(getByRole('button', { name: /add strength/i })).toBeDisabled();
    })
    it('Should successfully submit form with new values', async () => {
        const { getByRole, rerenderHook } = renderComponent({ strength });

        const newStrength = createMockStrength();
        fireEvent.change(getByRole('textbox', { name: /name/i }), { target: { value: newStrength.name }});
        fireEvent.click(getByRole('button', { name: /save/i }));

        await waitFor(() => {
            rerenderHook();
            expect(onSave).toHaveBeenCalledWith(expect.objectContaining({
                name: newStrength.name,
            }), expect.anything());
        })
    })
})