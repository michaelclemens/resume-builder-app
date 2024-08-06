import { fireEvent, waitFor } from "@testing-library/react";
import Form from "./Form"
import { createMockStrength } from "@/test/mocks";
import { useStrengthForm } from "@/hooks/form";
import { updateStrength } from "@/lib/client/strength";
import { ResponseStatus } from "@/lib/response";
import { renderWithProviders } from "@/test/redux";
import { faker } from "@faker-js/faker";
import { Strength } from "@prisma/client";

jest.mock('@/lib/client/strength');

const mockUpdateStrength = jest.mocked(updateStrength);
const formBody = jest.fn();
const onSave = jest.fn();

const createSuccessResponseReturn = async (strength: Strength) => Promise.resolve(({ 
    status: ResponseStatus.success, 
    payload: { strength }
}))

function renderComponent({ parentId, useFormHook, item }: { parentId: string, useFormHook: any, item?: Strength }) {
    return (renderWithProviders(
        <Form
            parentId={parentId}
            useFormHook={useFormHook}
            formBody={formBody}
            item={item}
            onSave={onSave}
        />
    ))
}
describe('FormComponent', () => {
    it('Should render the body component for a create form', async () => {
        const resumeId = faker.string.alphanumeric({ length: 5 });
        renderComponent({ 
            parentId: resumeId,
            useFormHook: useStrengthForm
        })

        expect(formBody).toHaveBeenCalledWith(expect.objectContaining({ editing: false }), expect.anything());
    })
    it('Should render the body component for an update form', async () => {
        const strength = createMockStrength();
        renderComponent({ 
            parentId: strength.resumeId,
            item: strength,
            useFormHook: useStrengthForm
        })

        expect(formBody).toHaveBeenCalledWith(expect.objectContaining({ editing: true }), expect.anything());
    })
    it('Should call onSave on successful update form submission', async () => {
        const strength = createMockStrength();
        mockUpdateStrength.mockImplementationOnce(async () => createSuccessResponseReturn(strength));

        const { getByRole } = renderComponent({ 
            parentId: strength.resumeId, 
            item: strength, 
            useFormHook: useStrengthForm
        })

        expect(onSave).not.toHaveBeenCalled();

        fireEvent.submit(getByRole('form'));

        await waitFor(() => {
            expect(onSave).toHaveBeenCalledTimes(1);
        })
    })
})