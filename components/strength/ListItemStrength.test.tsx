import { fireEvent, render, waitFor } from "@testing-library/react";
import ListItemStrength from "./ListItemStrength";
import { createMockStrength } from "@/test/mocks";
import { ButtonType } from "@/types/list";
import { faker } from "@faker-js/faker";

const remove = jest.fn();
const useStrengthList = jest.fn(() => ({ remove }))

jest.mock('@/hooks/list', () => ({ useStrengthList: () => useStrengthList() }));
jest.mock('@/components/strength/FormStrength', () => (props: any) => <form role="form" {...props} />);
jest.mock('@/components/list/LoadingOverlay', () => () => <div>Loading</div>)
console.error = jest.fn();

const strength = createMockStrength();

describe('ListItemStrengthComponent', () => {
    it('Should render a strength', () => {
        const { getByText } = render(<ListItemStrength {...strength} />)

        expect(getByText(strength.name)).toBeInTheDocument();
    })
    it('Should render edit and delete buttons', () => {
        const { getByTitle } = render(<ListItemStrength {...strength} />)

        expect(getByTitle(new RegExp(ButtonType.edit, 'i'))).toBeInTheDocument();
        expect(getByTitle(new RegExp(ButtonType.delete, 'i'))).toBeInTheDocument();
    })
    it('Should be able to delete', async () => {
        const { getByTitle } = render(<ListItemStrength {...strength} />);

        fireEvent.click(getByTitle(new RegExp(ButtonType.delete, 'i')));

        await waitFor(() => expect(remove).toHaveBeenCalledWith(strength));
    })
    it('Should handle errors when trying to delete', async () => {
        const error = new Error(faker.lorem.sentence());
        remove.mockRejectedValueOnce(error);

        const { getByTitle } = render(<ListItemStrength {...strength} />);

        fireEvent.click(getByTitle(new RegExp(ButtonType.delete, 'i')));

        await waitFor(() => expect(console.error).toHaveBeenCalledWith(error));
    })
    it('Should display loading overlay when deleting', async () => {
        const { getByTitle, getByText } = render(<ListItemStrength {...strength} />);

        fireEvent.click(getByTitle(new RegExp(ButtonType.delete, 'i')));

        await waitFor(() => expect(getByText(/loading/i)).toBeInTheDocument());
    })
    it('Should show form when editing', async () => {
        const { getByTitle, queryByRole } = render(<ListItemStrength {...strength} />);

        expect(queryByRole('form')).not.toBeInTheDocument()

        fireEvent.click(getByTitle(new RegExp(ButtonType.edit, 'i')));

        await waitFor(() => (
            expect(queryByRole('form')).toBeInTheDocument()
        ));
    })
})