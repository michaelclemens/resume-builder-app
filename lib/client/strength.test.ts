import { createMockStrength, createMultipleMockItems } from "@/test/mocks";
import { prismaMock } from "@/test/prisma";
import { addStrength, deleteStrength, getStrengths, setStrengthSortOrders, updateStrength } from "./strength";
import { faker } from "@faker-js/faker";
import { response, ResponseStatus } from "../response";

jest.mock('@/lib/prisma');

console.error = jest.fn();

describe('StrengthClient', () => {
    it('Should get strengths by resume', async () => {
        const strengths = createMultipleMockItems(createMockStrength, 5);
        const resumeId = strengths[0].resumeId;

        prismaMock.strength.findMany.mockResolvedValueOnce(strengths);

        await expect(getStrengths(resumeId)).resolves.toEqual(strengths);
        expect(prismaMock.strength.findMany).toHaveBeenCalledWith({ where: { resumeId }});
    })
    it('Should handle errors when getting strengths', async () => {
        const resumeId = faker.string.alphanumeric({ length: 5 });
        const error = new Error(faker.lorem.sentence());

        prismaMock.strength.findMany.mockRejectedValueOnce(error);

        await expect(getStrengths(resumeId)).resolves.toEqual([]);
        expect(console.error).toHaveBeenCalledWith(error);
    })
    it('Should add a strength to a resume', async () => {
        const strength = createMockStrength();
        
        prismaMock.strength.create.mockResolvedValueOnce(strength);

        const res = response(ResponseStatus.success, { payload: { strength }});
        await expect(addStrength(strength.resumeId, { name: strength.name })).resolves.toEqual(res);
        expect(prismaMock.strength.create).toHaveBeenCalledWith({
            data: { resumeId: strength.resumeId, name: strength.name }
        });
    })
    it('Should handle errors when adding a strength', async () => {
        const strength = createMockStrength();
        const error = new Error(faker.lorem.sentence());
        
        prismaMock.strength.create.mockRejectedValueOnce(error);

        const res = response(ResponseStatus.error, { error });
        await expect(addStrength(strength.resumeId, { name: strength.name })).resolves.toEqual(res);
    })
    it('Should update a strength', async () => {
        const strength = createMockStrength();
        
        prismaMock.strength.update.mockResolvedValueOnce(strength);

        const res = response(ResponseStatus.success, { payload: { strength }});
        await expect(updateStrength(strength.id, strength.resumeId, { name: strength.name })).resolves.toEqual(res);
        expect(prismaMock.strength.update).toHaveBeenCalledWith({
            where: { id: strength.id },
            data: { resumeId: strength.resumeId, name: strength.name }
        });
    })
    it('Should handle errors when updating a strength', async () => {
        const strength = createMockStrength();
        const error = new Error(faker.lorem.sentence());
        
        prismaMock.strength.update.mockRejectedValueOnce(error);

        const res = response(ResponseStatus.error, { error });
        await expect(updateStrength(strength.id, strength.resumeId, { name: strength.name })).resolves.toEqual(res);
    })
    it('Should set order of strengths', async () => {
        const strengths = createMultipleMockItems(createMockStrength, 5);

        strengths[1] = {...strengths[1], order: 5}
        strengths[4] = {...strengths[4], order: 2}

        await setStrengthSortOrders(strengths);

        expect(prismaMock.strength.update).toHaveBeenNthCalledWith(2, {
            where: { id: strengths[1].id },
            data: { order: 5 }
        })
        expect(prismaMock.strength.update).toHaveBeenNthCalledWith(5, {
            where: { id: strengths[4].id },
            data: { order: 2 }
        })
    })
    it('Should handle errors when setting order', async () => {
        const strengths = createMultipleMockItems(createMockStrength, 5);
        const error = new Error(faker.lorem.sentence());
        
        prismaMock.strength.update.mockRejectedValueOnce(error);

        await setStrengthSortOrders(strengths);
        expect(console.error).toHaveBeenCalledWith(error);
    })
    it('Should delete a strength', async () => {
        const strength = createMockStrength();

        prismaMock.strength.delete.mockResolvedValueOnce(strength);

        await expect(deleteStrength(strength.id)).resolves.toEqual(strength);
        expect(prismaMock.strength.delete).toHaveBeenCalledWith({ where: { id: strength.id }});
    })
    it('Should handle errors when deleting strengths', async () => {
        const strengthId = faker.string.alphanumeric({ length: 5 });
        const error = new Error(faker.lorem.sentence());

        prismaMock.strength.delete.mockRejectedValueOnce(error);

        await deleteStrength(strengthId);
        expect(console.error).toHaveBeenCalledWith(error);
    })
})