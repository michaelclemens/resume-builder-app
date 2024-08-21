import { createMockEmploymentWithHistory, createMultipleMockItems } from '@/test/mocks'
import { prismaMock } from '@/test/prisma'
import { addEmployment, deleteEmployment, getEmployments, setEmploymentSortOrders, updateEmployment } from './employment'
import { faker } from '@faker-js/faker'
import { response, ResponseStatus } from '../response'
import { Employment } from '@prisma/client'

jest.mock('@/lib/prisma')

console.error = jest.fn()
const getFormData = (employment: Employment) => ({
  employer: employment.employer,
  city: employment.city ?? undefined,
})
const getDbData = (employment: Employment) => ({
  resumeId: employment.resumeId,
  employer: employment.employer,
  city: employment.city ?? undefined,
})

describe('EmploymentClient', () => {
  it('Should get employments by resume', async () => {
    const employments = createMultipleMockItems(createMockEmploymentWithHistory, 5)
    const resumeId = employments[0].resumeId

    prismaMock.employment.findMany.mockResolvedValueOnce(employments)

    await expect(getEmployments(resumeId)).resolves.toEqual(employments)
    expect(prismaMock.employment.findMany).toHaveBeenCalledWith({ where: { resumeId }, include: { history: true } })
  })
  it('Should handle errors when getting employments', async () => {
    const resumeId = faker.string.alphanumeric({ length: 5 })
    const error = new Error(faker.lorem.sentence())

    prismaMock.employment.findMany.mockRejectedValueOnce(error)

    await expect(getEmployments(resumeId)).resolves.toEqual([])
    expect(console.error).toHaveBeenCalledWith(error)
  })
  it('Should add a employment to a resume', async () => {
    const employment = createMockEmploymentWithHistory()

    prismaMock.employment.create.mockResolvedValueOnce(employment)

    const res = response(ResponseStatus.success, { payload: { employment } })
    await expect(addEmployment(employment.resumeId, getFormData(employment))).resolves.toEqual(res)
    expect(prismaMock.employment.create).toHaveBeenCalledWith({ data: getDbData(employment) })
  })
  it('Should handle errors when adding a employment', async () => {
    const employment = createMockEmploymentWithHistory()
    const error = new Error(faker.lorem.sentence())

    prismaMock.employment.create.mockRejectedValueOnce(error)

    const res = response(ResponseStatus.error, { error })
    await expect(addEmployment(employment.resumeId, getFormData(employment))).resolves.toEqual(res)
  })
  it('Should update a employment', async () => {
    const employment = createMockEmploymentWithHistory()

    prismaMock.employment.update.mockResolvedValueOnce(employment)

    const res = response(ResponseStatus.success, { payload: { employment } })
    await expect(updateEmployment(employment.id, employment.resumeId, getFormData(employment))).resolves.toEqual(res)
    expect(prismaMock.employment.update).toHaveBeenCalledWith({
      where: { id: employment.id },
      data: getDbData(employment),
    })
  })
  it('Should handle errors when updating a employment', async () => {
    const employment = createMockEmploymentWithHistory()
    const error = new Error(faker.lorem.sentence())

    prismaMock.employment.update.mockRejectedValueOnce(error)

    const res = response(ResponseStatus.error, { error })
    await expect(updateEmployment(employment.id, employment.resumeId, getFormData(employment))).resolves.toEqual(res)
  })
  it('Should set order of employments', async () => {
    const employments = createMultipleMockItems(createMockEmploymentWithHistory, 5)

    employments[1] = { ...employments[1], order: 5 }
    employments[4] = { ...employments[4], order: 2 }

    await setEmploymentSortOrders(employments)

    expect(prismaMock.employment.update).toHaveBeenNthCalledWith(2, {
      where: { id: employments[1].id },
      data: { order: 5 },
    })
    expect(prismaMock.employment.update).toHaveBeenNthCalledWith(5, {
      where: { id: employments[4].id },
      data: { order: 2 },
    })
  })
  it('Should handle errors when setting order', async () => {
    const employments = createMultipleMockItems(createMockEmploymentWithHistory, 5)
    const error = new Error(faker.lorem.sentence())

    prismaMock.employment.update.mockRejectedValueOnce(error)

    await setEmploymentSortOrders(employments)
    expect(console.error).toHaveBeenCalledWith(error)
  })
  it('Should delete a employment', async () => {
    const employment = createMockEmploymentWithHistory()

    prismaMock.employment.delete.mockResolvedValueOnce(employment)

    await expect(deleteEmployment(employment.id)).resolves.toEqual(employment)
    expect(prismaMock.employment.delete).toHaveBeenCalledWith({ where: { id: employment.id } })
  })
  it('Should handle errors when deleting employments', async () => {
    const employmentId = faker.string.alphanumeric({ length: 5 })
    const error = new Error(faker.lorem.sentence())

    prismaMock.employment.delete.mockRejectedValueOnce(error)

    await deleteEmployment(employmentId)
    expect(console.error).toHaveBeenCalledWith(error)
  })
})
