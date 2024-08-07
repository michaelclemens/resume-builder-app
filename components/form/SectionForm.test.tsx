import { fireEvent, waitFor } from "@testing-library/react";
import { createMockStrength } from "@/test/mocks";
import { updateStrength } from "@/lib/client/strength";
import { ResponseStatus } from "@/lib/response";
import { renderWithProviders } from "@/test/redux";
import { faker } from "@faker-js/faker";
import { Strength } from "@prisma/client";
import SectionForm from "./SectionForm";
import { SectionEnums, SectionType } from "@/types/section";
import { getSectionFormBodyComponent } from "@/util/section";

jest.mock('@/lib/client/strength');
jest.mock('@/util/section', (() => ({
    ...jest.requireActual('@/util/section'),
    getSectionFormBodyComponent: jest.fn()
})));

const FormBodyComponent = jest.fn();
const mockUpdateStrength = jest.mocked(updateStrength);
jest.mocked(getSectionFormBodyComponent).mockReturnValue(( FormBodyComponent ));
const onSave = jest.fn();

const createSuccessResponseReturn = async (strength: Strength) => Promise.resolve(({ 
    status: ResponseStatus.success, 
    payload: { strength }
}))

function renderComponent(
    { sectionType = SectionEnums.strength, parentId, item, preloadedState }: 
    { sectionType?: SectionType, parentId: string, item?: Strength, preloadedState?: any }
) {
    return (renderWithProviders(
        <SectionForm
            sectionType={sectionType}
            parentId={parentId}
            item={item}
            onSave={onSave}
        />, { preloadedState })
    )
}
describe('FormComponent', () => {
    it('Should render the body component for a create form', async () => {
        const resumeId = faker.string.alphanumeric({ length: 5 });
        renderComponent({ parentId: resumeId })

        expect(FormBodyComponent).toHaveBeenCalledWith(expect.objectContaining({ editing: false }), expect.anything());
    })
    it('Should render the body component for an update form', async () => {
        const strength = createMockStrength();
        renderComponent({ 
            parentId: strength.resumeId,
            item: strength,
        })

        expect(FormBodyComponent).toHaveBeenCalledWith(expect.objectContaining({ editing: true }), expect.anything());
    })
    it('Should call onSave on successful update form submission', async () => {
        const strength = createMockStrength();
        mockUpdateStrength.mockImplementationOnce(async () => createSuccessResponseReturn(strength));

        const { getByRole } = renderComponent({ 
            parentId: strength.resumeId, 
            item: strength, 
            preloadedState: { strength: [strength] }
        })

        expect(onSave).not.toHaveBeenCalled();

        fireEvent.submit(getByRole('form'));

        await waitFor(() => {
            expect(onSave).toHaveBeenCalledTimes(1);
        })
    })
})