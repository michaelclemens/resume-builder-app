import { createMockPersonal } from "@/test/mocks";
import { prismaMock } from "@/test/prisma";
import { addPersonal, getPersonal, updatePersonal } from "./personal";
import { faker } from "@faker-js/faker";
import { response, ResponseStatus } from "../response";
import { Personal } from "@prisma/client";

jest.mock('@/lib/prisma');

console.error = jest.fn();
const getFormData = (personal: Personal) => ({
    firstName: personal.firstName,
    lastName: personal.lastName,
    position: personal.position ?? undefined,
    summary: personal.summary ?? undefined,
    email: personal.email ?? undefined,
    phone: personal.phone ?? undefined,
    city: personal.city ?? undefined,
    country: personal.country ?? undefined
})
const getDbData = (personal: Personal) => ({
    resumeId: personal.resumeId,
    ...getFormData(personal)
})

describe('PersonalClient', () => {
    it('Should get personal from resume', async () => {
        const personal = createMockPersonal();

        prismaMock.personal.findUnique.mockResolvedValueOnce(personal);

        await expect(getPersonal(personal.resumeId)).resolves.toEqual(personal);
        expect(prismaMock.personal.findUnique).toHaveBeenCalledWith({ where: { resumeId: personal.resumeId }});
    })
    it('Should handle errors when getting personal', async () => {
        const resumeId = faker.string.alphanumeric({ length: 5 });
        const error = new Error(faker.lorem.sentence());

        prismaMock.personal.findUnique.mockRejectedValueOnce(error);

        await expect(getPersonal(resumeId)).resolves.toBeNull();
        expect(console.error).toHaveBeenCalledWith(error);
    })
    it('Should add a personal to a resume', async () => {
        const personal = createMockPersonal();
        
        prismaMock.personal.create.mockResolvedValueOnce(personal);

        const res = response(ResponseStatus.success, { payload: { personal }});
        await expect(addPersonal(personal.resumeId, getFormData(personal))).resolves.toEqual(res);
        expect(prismaMock.personal.create).toHaveBeenCalledWith({data: getDbData(personal) });
    })
    it('Should handle errors when adding a personal', async () => {
        const personal = createMockPersonal();
        const error = new Error(faker.lorem.sentence());
        
        prismaMock.personal.create.mockRejectedValueOnce(error);

        const res = response(ResponseStatus.error, { error });
        await expect(addPersonal(personal.resumeId, getFormData(personal))).resolves.toEqual(res);
    })
    it('Should update a personal', async () => {
        const personal = createMockPersonal();
        
        prismaMock.personal.update.mockResolvedValueOnce(personal);

        const res = response(ResponseStatus.success, { payload: { personal }});
        await expect(updatePersonal(personal.id, personal.resumeId, getFormData(personal))).resolves.toEqual(res);
        expect(prismaMock.personal.update).toHaveBeenCalledWith({
            where: { id: personal.id },
            data: getDbData(personal)
        });
    })
    it('Should handle errors when updating a personal', async () => {
        const personal = createMockPersonal();
        const error = new Error(faker.lorem.sentence());
        
        prismaMock.personal.update.mockRejectedValueOnce(error);

        const res = response(ResponseStatus.error, { error });
        await expect(updatePersonal(personal.id, personal.resumeId, getFormData(personal))).resolves.toEqual(res);
    })
})