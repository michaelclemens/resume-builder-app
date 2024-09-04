import { createMockEducation, createMultipleMockItems } from '@/test/mocks'
import { prismaMock } from '@/test/prisma'
import { faker } from '@faker-js/faker'
import { Education } from '@prisma/client'
import { getMockDBDate, getMockInputDate } from '@/util/date'
import { response, ResponseStatus } from '../response'
import { addEducation, deleteEducation, getEducations, setEducationSortOrders, updateEducation } from './education'

jest.mock('@/lib/prisma')

console.error = jest.fn()
const getFormData = (education: Education) => ({
  school: education.school,
  degree: education.degree,
  startDate: getMockInputDate(education.startDate),
  endDate: education.endDate ? getMockInputDate(education.endDate) : undefined,
  city: education.city ?? undefined,
  description: education.description ?? undefined,
})
const getDbData = (education: Education) => ({
  resumeId: education.resumeId,
  school: education.school,
  degree: education.degree,
  startDate: getMockDBDate(education.startDate),
  endDate: education.endDate ? getMockDBDate(education.endDate) : undefined,
  city: education.city ?? undefined,
  description: education.description ?? undefined,
})

describe('EducationClient', () => {
  it('Should get educations by resume', async () => {
    const educations = createMultipleMockItems(createMockEducation, 5)
    const resumeId = educations[0].resumeId

    prismaMock.education.findMany.mockResolvedValueOnce(educations)

    await expect(getEducations(resumeId)).resolves.toEqual(educations)
    expect(prismaMock.education.findMany).toHaveBeenCalledWith({ where: { resumeId } })
  })
  it('Should handle errors when getting educations', async () => {
    const resumeId = faker.string.alphanumeric({ length: 5 })
    const error = new Error(faker.lorem.sentence())

    prismaMock.education.findMany.mockRejectedValueOnce(error)

    await expect(getEducations(resumeId)).resolves.toEqual([])
    expect(console.error).toHaveBeenCalledWith(error)
  })
  it('Should add a education to a resume', async () => {
    const education = createMockEducation()

    prismaMock.education.create.mockResolvedValueOnce(education)

    const res = response(ResponseStatus.success, { payload: { education } })
    await expect(addEducation(education.resumeId, getFormData(education))).resolves.toEqual(res)
    expect(prismaMock.education.create).toHaveBeenCalledWith({ data: getDbData(education) })
  })
  it('Should handle errors when adding a education', async () => {
    const education = createMockEducation()
    const error = new Error(faker.lorem.sentence())

    prismaMock.education.create.mockRejectedValueOnce(error)

    const res = response(ResponseStatus.error, { error })
    await expect(addEducation(education.resumeId, getFormData(education))).resolves.toEqual(res)
  })
  it('Should update a education', async () => {
    const education = createMockEducation()

    prismaMock.education.update.mockResolvedValueOnce(education)

    const res = response(ResponseStatus.success, { payload: { education } })
    await expect(updateEducation(education.id, education.resumeId, getFormData(education))).resolves.toEqual(res)
    expect(prismaMock.education.update).toHaveBeenCalledWith({
      where: { id: education.id },
      data: getDbData(education),
    })
  })
  it('Should handle errors when updating a education', async () => {
    const education = createMockEducation()
    const error = new Error(faker.lorem.sentence())

    prismaMock.education.update.mockRejectedValueOnce(error)

    const res = response(ResponseStatus.error, { error })
    await expect(updateEducation(education.id, education.resumeId, getFormData(education))).resolves.toEqual(res)
  })
  it('Should set order of educations', async () => {
    const educations = createMultipleMockItems(createMockEducation, 5)

    educations[1] = { ...educations[1], order: 5 }
    educations[4] = { ...educations[4], order: 2 }

    await setEducationSortOrders(educations)

    expect(prismaMock.education.update).toHaveBeenNthCalledWith(2, {
      where: { id: educations[1].id },
      data: { order: 5 },
    })
    expect(prismaMock.education.update).toHaveBeenNthCalledWith(5, {
      where: { id: educations[4].id },
      data: { order: 2 },
    })
  })
  it('Should handle errors when setting order', async () => {
    const educations = createMultipleMockItems(createMockEducation, 5)
    const error = new Error(faker.lorem.sentence())

    prismaMock.education.update.mockRejectedValueOnce(error)

    await setEducationSortOrders(educations)
    expect(console.error).toHaveBeenCalledWith(error)
  })
  it('Should delete a education', async () => {
    const education = createMockEducation()

    prismaMock.education.delete.mockResolvedValueOnce(education)

    await expect(deleteEducation(education.id)).resolves.toEqual(education)
    expect(prismaMock.education.delete).toHaveBeenCalledWith({ where: { id: education.id } })
  })
  it('Should handle errors when deleting educations', async () => {
    const educationId = faker.string.alphanumeric({ length: 5 })
    const error = new Error(faker.lorem.sentence())

    prismaMock.education.delete.mockRejectedValueOnce(error)

    await deleteEducation(educationId)
    expect(console.error).toHaveBeenCalledWith(error)
  })
})
