import { fireEvent, waitFor } from "@testing-library/react";
import FormBodySkill from "./FormBodySkill";
import { createMockSkill, renderFormBody } from "@/test/mocks";
import { Skill } from "@prisma/client";
import { SkillSchema } from "@/types/form";
import { getDefaultValuesSkill } from "@/util/form";

const skill = createMockSkill();
const onSave = jest.fn();

const renderComponent = ({ skill }: { skill?: Skill } = {}) => (
    renderFormBody({
        component: FormBodySkill,
        editing: !!skill,
        defaultValues: getDefaultValuesSkill(skill),
        schema: SkillSchema,
        onSave
    })
)

describe('FormBodySkillComponent', () => {
    it('Should render create new form', () => {
        const { getByRole } = renderComponent();

        expect(getByRole('textbox', { name: /name/i })).toHaveValue("");
        expect(getByRole('button', { name: /add skill/i })).toBeInTheDocument();
    })
    it('Should render an update form', () => {
        const { getByRole } = renderComponent({ skill });

        expect(getByRole('textbox', { name: /name/i })).toHaveValue(skill.name);
        expect(getByRole('button', { name: /save/i })).toBeInTheDocument();
    })
    it('Should display errros for required fields', async () => {
        const { getAllByRole, getByRole, getByText, rerenderHook } = renderComponent();

        expect(getByRole('textbox', { name: /name/i })).toBeRequired();

        fireEvent.click(getByRole('button', { name: /add skill/i }));
  
        await waitFor(() => {
            rerenderHook();
            expect(onSave).not.toHaveBeenCalled();
            expect(getAllByRole("alert")).toHaveLength(1);
            expect(getByText(/name is required/i)).toBeInTheDocument();
        })
    })
    it('Should disable form elements when submitting', async () => {
        const { getByRole, rerenderHook } = renderComponent();

        fireEvent.click(getByRole('button', { name: /add skill/i }));

        await waitFor(() => {
            rerenderHook();
            expect(getByRole('textbox', { name: /name/i })).toBeDisabled();
            expect(getByRole('button', { name: /add skill/i })).toBeDisabled();
        })
    })
    it('Should successfully submit form with new values', async () => {
        const { getByRole, rerenderHook } = renderComponent({ skill });

        const newSkill = createMockSkill();
        fireEvent.change(getByRole('textbox', { name: /name/i }), { target: { value: newSkill.name }});
        fireEvent.click(getByRole('button', { name: /save/i }));

        await waitFor(() => {
            rerenderHook();
            expect(onSave).toHaveBeenCalledWith(expect.objectContaining({
                name: newSkill.name,
            }), expect.anything());
        })
    })
})