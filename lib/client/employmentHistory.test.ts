import { createMockHistory, createMultipleMockItems } from "@/test/mocks";
import { prismaMock } from "@/test/prisma";
import { addEmploymentHistory, deleteEmploymentHistory, setSortOrders, updateEmploymentHistory } from "./employmentHistory";
import { faker } from "@faker-js/faker";
import { response, ResponseStatus } from "../response";
import { EmploymentHistory } from "@prisma/client";
import { getDateFromDisplayDate, getDisplayDateFromDate } from "@/util/date";

jest.mock('@/lib/prisma');

console.error = jest.fn();
const getFormData = (history: EmploymentHistory) => ({
    title: history.title,
    startDate: getDisplayDateFromDate(history.startDate),
    endDate: history.endDate ? getDisplayDateFromDate(history.endDate) : undefined,
    description: history.description ?? undefined
})
const getDbData = (history: EmploymentHistory) => ({
    employmentId: history.employmentId, 
    title: history.title,
    startDate: getDateFromDisplayDate(history.startDate.toISOString()),
    endDate: history.endDate ? getDateFromDisplayDate(history.endDate.toISOString()) : undefined,
    description: history.description ?? undefined
})

describe('EmploymentHistoryClient', () => {
    it('Should add a history to an employment', async () => {
        const history = createMockHistory();
        
        prismaMock.employmentHistory.create.mockResolvedValueOnce(history);

        const res = response(ResponseStatus.success, { payload: { history }});
        await expect(addEmploymentHistory(history.employmentId, getFormData(history))).resolves.toEqual(res);
        expect(prismaMock.employmentHistory.create).toHaveBeenCalledWith({ data: getDbData(history)});
    })
    it('Should handle errors when adding a history', async () => {
        const history = createMockHistory();
        const error = new Error(faker.lorem.sentence());
        
        prismaMock.employmentHistory.create.mockRejectedValueOnce(error);

        const res = response(ResponseStatus.error, { error });
        await expect(addEmploymentHistory(history.employmentId, getFormData(history))).resolves.toEqual(res);
    })
    it('Should update a history', async () => {
        const history = createMockHistory();
        
        prismaMock.employmentHistory.update.mockResolvedValueOnce(history);

        const res = response(ResponseStatus.success, { payload: { history }});
        await expect(updateEmploymentHistory(history.id, history.employmentId, getFormData(history))).resolves.toEqual(res);
        expect(prismaMock.employmentHistory.update).toHaveBeenCalledWith({
            where: { id: history.id },
            data: getDbData(history)
        });
    })
    it('Should handle errors when updating a history', async () => {
        const history = createMockHistory();
        const error = new Error(faker.lorem.sentence());
        
        prismaMock.employmentHistory.update.mockRejectedValueOnce(error);

        const res = response(ResponseStatus.error, { error });
        await expect(updateEmploymentHistory(history.id, history.employmentId, getFormData(history))).resolves.toEqual(res);
    })
    it('Should set order of historys', async () => {
        const histories = createMultipleMockItems(createMockHistory, 5);

        histories[1] = {...histories[1], order: 5}
        histories[4] = {...histories[4], order: 2}

        await setSortOrders(histories);

        expect(prismaMock.employmentHistory.update).toHaveBeenNthCalledWith(2, {
            where: { id: histories[1].id },
            data: { order: 5 }
        })
        expect(prismaMock.employmentHistory.update).toHaveBeenNthCalledWith(5, {
            where: { id: histories[4].id },
            data: { order: 2 }
        })
    })
    it('Should handle errors when setting order', async () => {
        const historys = createMultipleMockItems(createMockHistory, 5);
        const error = new Error(faker.lorem.sentence());
        
        prismaMock.employmentHistory.update.mockRejectedValueOnce(error);

        await setSortOrders(historys);
        expect(console.error).toHaveBeenCalledWith(error);
    })
    it('Should delete a history', async () => {
        const history = createMockHistory();

        prismaMock.employmentHistory.delete.mockResolvedValueOnce(history);

        await expect(deleteEmploymentHistory(history.id)).resolves.toEqual(history);
        expect(prismaMock.employmentHistory.delete).toHaveBeenCalledWith({ where: { id: history.id }});
    })
    it('Should handle errors when deleting historys', async () => {
        const historyId = faker.string.alphanumeric({ length: 5 });
        const error = new Error(faker.lorem.sentence());

        prismaMock.employmentHistory.delete.mockRejectedValueOnce(error);

        await deleteEmploymentHistory(historyId);
        expect(console.error).toHaveBeenCalledWith(error);
    })
})