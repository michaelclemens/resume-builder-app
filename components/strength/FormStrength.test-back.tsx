import { createMockStrength } from "@/test/mocks";
import FormStrength from "./FormStrength";
import { fireEvent, waitFor } from "@testing-library/react";
import { renderWithProviders } from "@/test/redux";
import { faker } from "@faker-js/faker";
import { addStrength, updateStrength } from "@/lib/client/strength";
import { ResponseStatus } from "@/lib/response";

jest.mock('@/lib/client/strength');
const mockAddStrength = jest.mocked(addStrength);
const mockUpdateStrength = jest.mocked(updateStrength);
const onSave = jest.fn();
console.error = jest.fn();

const strength = createMockStrength();

describe('FormStrengthComponent', () => {
    it('Should render create new strength form', () => {
        const { getByRole } = renderWithProviders(<FormStrength resumeId={strength.resumeId} />);

        const input = getByRole('textbox', { name: /name/i });

        expect(getByRole('form')).toBeInTheDocument();
        expect(input).toBeInTheDocument();
        expect(input).toHaveValue("");
        expect(getByRole('button', { name: /add strength/i})).toBeInTheDocument();
    })
    it('Should render an update strength form', () => {
        const { getByRole } = renderWithProviders(<FormStrength resumeId={strength.resumeId} strength={strength} />);

        const input = getByRole('textbox', { name: /name/i });

        expect(getByRole('form')).toBeInTheDocument();
        expect(input).toBeInTheDocument();
        expect(input).toHaveValue(strength.name);
        expect(getByRole('button', { name: /save/i})).toBeInTheDocument();
    })
    it('Should display required error when no value submitted', async () => {
        const { getByRole, findAllByRole } = renderWithProviders(<FormStrength resumeId={strength.resumeId} onSave={onSave} />);
        
        fireEvent.submit(getByRole("button"));

        expect(await findAllByRole("alert")).toHaveLength(1);
        expect(onSave).not.toHaveBeenCalled();
    })
    it('Should successfully create a new strength', async () => {
        mockAddStrength.mockReturnValueOnce(Promise.resolve({ 
            status: ResponseStatus.success, 
            payload: { strength }, 
            message: '', 
            serverError: null,
            formErrors: []
        }));

        const { getByRole, queryAllByRole } = renderWithProviders(<FormStrength resumeId={strength.resumeId} onSave={onSave} />);
        
        const name = faker.lorem.word();
        const nameInput = getByRole('textbox', { name: /name/i });
        const submitButton = getByRole("button");

        expect(nameInput).not.toBeDisabled();
        expect(submitButton).not.toBeDisabled();

        fireEvent.input(nameInput, { target: { value: name } })
        fireEvent.submit(submitButton);

        expect(nameInput).toBeDisabled();
        expect(submitButton).toBeDisabled();

        await waitFor(() => (
            expect(queryAllByRole("alert")).toHaveLength(0),
            expect(onSave).toHaveBeenCalled(),
            expect(mockAddStrength).toHaveBeenCalledWith(strength.resumeId, { name }),
            expect(nameInput).toHaveValue("")
        ));
    })
    it('Should successfully update a strength', async () => {
        mockUpdateStrength.mockReturnValueOnce(Promise.resolve({ 
            status: ResponseStatus.success, 
            payload: { strength }, 
            message: '', 
            serverError: null,
            formErrors: []
        }));

        const { getByRole, queryAllByRole } = renderWithProviders(<FormStrength resumeId={strength.resumeId} strength={strength} onSave={onSave} />);
        
        const nameInput = getByRole('textbox', { name: /name/i });
        fireEvent.submit(getByRole("button"));

        await waitFor(() => (
            expect(queryAllByRole("alert")).toHaveLength(0),
            expect(onSave).toHaveBeenCalled(),
            expect(mockUpdateStrength).toHaveBeenCalledWith(strength.id, strength.resumeId, { name: strength.name }),
            expect(nameInput).toHaveValue(strength.name)
        ));
    })
    it('Should display an error when saving fails', async () => {
        const errorMessage = faker.lorem.sentence();
        mockUpdateStrength.mockReturnValueOnce(Promise.resolve({ 
            status: ResponseStatus.error, 
            payload: { strength }, 
            message: '', 
            serverError: null,
            formErrors: [{ path: 'name', message: errorMessage }]
        }));

        const { getByRole, getByText, queryAllByRole } = renderWithProviders(<FormStrength resumeId={strength.resumeId} strength={strength} onSave={onSave} />);
        
        fireEvent.submit(getByRole("button"));

        await waitFor(() => (
            expect(queryAllByRole("alert")).toHaveLength(1),
            expect(getByText(errorMessage)).toBeInTheDocument(),
            expect(onSave).not.toHaveBeenCalled()
        ));
    })
    it('Should log server errors if the save fails', async () => {
        const errorMessage = faker.lorem.sentence();
        mockUpdateStrength.mockReturnValueOnce(Promise.resolve({ 
            status: ResponseStatus.error, 
            payload: { strength }, 
            message: '', 
            serverError: errorMessage,
            formErrors: []
        }));

        const { getByRole, getByText, queryAllByRole } = renderWithProviders(<FormStrength resumeId={strength.resumeId} strength={strength} onSave={onSave} />);
        
        fireEvent.submit(getByRole("button"));

        await waitFor(() => (
            expect(queryAllByRole("alert")).toHaveLength(0),
            expect(console.error).toHaveBeenCalledWith(errorMessage),
            expect(onSave).not.toHaveBeenCalled()
        ));
    })
})