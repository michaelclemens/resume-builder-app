import { faker } from "@faker-js/faker"
import { fireEvent, render, screen } from "@testing-library/react";
import ListButton, { ButtonType, iconYPaddingClass, labelYPaddingClass } from "./ListButton";

const label = faker.lorem.word();

describe('List/ListButtonComponent', () => {
    it('Should render a button', () => {
        const { getByRole } = render(<ListButton label={label} />);

        expect(getByRole('button', { name: label })).toBeInTheDocument();
    })
    it('Should render a button wthout any props', () => {
        const { getByRole } = render(<ListButton />);

        expect(getByRole('button')).toBeInTheDocument();
    })
    it('Should render an edit icon button', () => {
        const { getByTitle } = render(<ListButton type={ButtonType.edit} />);

        expect(getByTitle('Edit')).toBeInTheDocument();
    })
    it('Should render a delete icon button', () => {
        const { getByTitle } = render(<ListButton type={ButtonType.delete} />);

        expect(getByTitle('Delete')).toBeInTheDocument();
    })
    it('Should fire callback on click', () => {
        const onClick = jest.fn();

        const { rerender } = render(<ListButton label={label} type={ButtonType.delete} />);

        fireEvent.click(screen.getByRole('button'));

        expect(onClick).not.toHaveBeenCalled();

        rerender(<ListButton label={label} type={ButtonType.delete} onClick={onClick} />)

        fireEvent.click(screen.getByRole('button'));
        
        expect(onClick).toHaveBeenCalled();
    })
    it('Should apply the correct padding depending on the content', () =>{
        const { rerender } = render(<ListButton label={label} />);

        expect(screen.getByRole('button', { name: label })).toHaveClass(labelYPaddingClass);

        rerender(<ListButton type={ButtonType.edit} />);
 
        expect(screen.getByRole('button')).toHaveClass(iconYPaddingClass);
    })
})