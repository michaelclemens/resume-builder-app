import { faker } from "@faker-js/faker"
import { fireEvent, render } from "@testing-library/react"
import Tabs, { activeStyleClass, nonActiveStyleClass } from "./Tabs"

const tab1 = { name: faker.lorem.word(), href: faker.internet.url({ appendSlash: true }) }
const tab2 = { name: faker.lorem.word(), href: faker.internet.url({ appendSlash: true }) }
const tabs = [tab1, tab2];

const useSelectedLayoutSegment = jest.fn();
const useRouter = jest.fn();
jest.mock('next/navigation', () => ({ 
    useSelectedLayoutSegment: () => useSelectedLayoutSegment(),
    useRouter: () => useRouter()
 }));

const push = jest.fn();
useRouter.mockImplementation(() => ({ push }))

describe('TabsComponent', () => {
    it('Should render tabs', () => {
        const { getByText } = render(<Tabs tabs={tabs} />);

        const tab1El = getByText(tab1.name);
        const tab2El = getByText(tab2.name);

        expect(tab1El).toBeInTheDocument();
        expect(tab2El).toBeInTheDocument();
    })
    it('Should default the first tab to be active', () => {
        const { getByText } = render(<Tabs tabs={tabs} />);

        const tab1ElParent = getByText(tab1.name).parentElement;
        const tab2ElParent = getByText(tab2.name).parentElement;

        expect(tab1ElParent).toHaveClass(activeStyleClass);
        expect(tab1ElParent).not.toHaveClass(nonActiveStyleClass);
        expect(tab2ElParent).toHaveClass(nonActiveStyleClass);
    })
    it('Should default the selected layout segment to be active', () => {
        useSelectedLayoutSegment.mockReturnValueOnce(tab2.name)

        const { getByText } = render(<Tabs tabs={tabs} />);

        const tab1ElParent = getByText(tab1.name).parentElement;
        const tab2ElParent = getByText(tab2.name).parentElement;

        expect(tab2ElParent).toHaveClass(activeStyleClass);
        expect(tab2ElParent).not.toHaveClass(nonActiveStyleClass);
        expect(tab1ElParent).toHaveClass(nonActiveStyleClass);

    })
    it('Should be able to change active tab', () => {
        const { getByText } = render(<Tabs tabs={tabs} />);

        const tab1El = getByText(tab1.name);
        const tab2El = getByText(tab2.name);

        expect(tab1El.parentElement).toHaveClass(activeStyleClass);
        expect(tab2El.parentElement).toHaveClass(nonActiveStyleClass);

        fireEvent.click(tab2El);

        expect(push).toHaveBeenCalledWith(tab2.href);
        expect(tab1El.parentElement).toHaveClass(nonActiveStyleClass);
        expect(tab2El.parentElement).toHaveClass(activeStyleClass);
    })
})