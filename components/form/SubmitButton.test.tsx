import { faker } from "@faker-js/faker"
import SubmitButton from "./SubmitButton";
import { render, screen } from "@testing-library/react";

describe('Form/SubmitButtonComponent', () => {
    it('Should render a submit button', () => {
        const label = faker.lorem.word();

        const { getByRole } = render(<SubmitButton label={label} />);

        const button = getByRole('button', { name: label });

        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute('type', 'submit');
    })
    it('Should be able to toggle disabled attrbute', () => {
        const label = faker.lorem.word();

        const { rerender } = render(<SubmitButton disabled={false} label={label} />);

        expect(screen.getByRole('button', { name: label })).not.toHaveAttribute('disabled');

        rerender(<SubmitButton disabled={true} label={label} />);

        expect(screen.getByRole('button', { name: label })).toHaveAttribute('disabled');
    })
})