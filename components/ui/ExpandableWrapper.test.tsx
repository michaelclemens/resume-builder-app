import { render, screen } from "@testing-library/react";
import { faker } from '@faker-js/faker';
import ExpandableWrapper from './ExpandableWrapper';

const text = faker.lorem.sentence();
const Children = () => <div>{text}</div>

describe('ExpandableWrapperComponent', () => {
    it('Should open and close', () => {
        const { rerender } = render(<ExpandableWrapper><Children /></ExpandableWrapper>);

        expect(screen.queryByText(text)).not.toBeInTheDocument();

        rerender(<ExpandableWrapper open={true}><Children /></ExpandableWrapper>);

        expect(screen.queryByText(text)).toBeInTheDocument();
    })
})