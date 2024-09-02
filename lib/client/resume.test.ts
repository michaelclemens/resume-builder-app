import { createMockFullResume, createMockResume, createMultipleMockItems } from '@/test/mocks'
import { prismaMock } from '@/test/prisma'
import { faker } from '@faker-js/faker'
import { Resume, Template } from '@prisma/client'
import { createResumeAction, deleteResume, generateResumePreview, getAllResumes, getResume, getResumeFull, updateResume } from './resume'
import { notFound, redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { generateScreenshot } from '../puppeteer'

jest.mock('@/lib/prisma')
jest.mock('next/navigation')
jest.mock('next/cache')
jest.mock('../puppeteer')

const mockRedirect = jest.mocked(redirect)
const mockRevalidatePath = jest.mocked(revalidatePath)
const mockGenerateScreenshot = jest.mocked(generateScreenshot)
const mockNotFound = jest.mocked(notFound)
console.error = jest.fn()

const getFormData = (resume: Resume) => ({
  template: resume.template ?? Template.DEFAULT,
  templateOptions: resume.templateOptions ?? null,
})
const getDbData = (resume: Resume) => ({ ...getFormData(resume) })
const resume = createMockResume()
const error = new Error(faker.lorem.sentence())

describe('ResumeClient', () => {
  it('Should get resume by id', async () => {
    prismaMock.resume.findUniqueOrThrow.mockResolvedValueOnce(resume)
    await expect(getResume(resume.id)).resolves.toEqual(resume)
    expect(prismaMock.resume.findUniqueOrThrow).toHaveBeenCalledWith({ where: { id: resume.id } })
    expect(mockNotFound).not.toHaveBeenCalled()
  })
  it('Should handle errors when getting resume by id', async () => {
    prismaMock.resume.findUniqueOrThrow.mockRejectedValueOnce(error)
    await expect(getResume(resume.id)).resolves.toBeUndefined()
    expect(console.error).toHaveBeenCalledWith(error)
    expect(mockNotFound).toHaveBeenCalled()
  })
  it('Should update a resume', async () => {
    prismaMock.resume.update.mockResolvedValueOnce(resume)
    await expect(updateResume(resume.id, getFormData(resume))).resolves.toEqual(resume)
    expect(prismaMock.resume.update).toHaveBeenCalledWith({
      where: { id: resume.id },
      data: getDbData(resume),
    })
  })
  it('Should handle errors when updating a resume', async () => {
    prismaMock.resume.update.mockRejectedValueOnce(error)
    await expect(updateResume(resume.id, getFormData(resume))).resolves.toBeNull()
    expect(console.error).toHaveBeenCalledWith(error)
  })
  it('Should get all resumes', async () => {
    const resumes = createMultipleMockItems(createMockResume, 5)
    prismaMock.resume.findMany.mockResolvedValueOnce(resumes)
    await expect(getAllResumes()).resolves.toEqual(resumes)
    expect(prismaMock.resume.findMany).toHaveBeenCalledWith({
      take: 10,
      orderBy: { createdAt: 'asc' },
    })
  })
  it('Should handle errors when getting all resumes', async () => {
    prismaMock.resume.findMany.mockRejectedValueOnce(error)
    await expect(getAllResumes()).resolves.toEqual([])
    expect(console.error).toHaveBeenCalledWith(error)
  })
  it('Should get a full (all includes) resume', async () => {
    const resume = createMockFullResume()
    prismaMock.resume.findUniqueOrThrow.mockResolvedValueOnce(resume)
    await expect(getResumeFull(resume.id)).resolves.toEqual(resume)
    expect(prismaMock.resume.findUniqueOrThrow).toHaveBeenCalledWith({
      where: { id: resume.id },
      include: {
        personal: true,
        employments: { include: { history: true } },
        educations: true,
        skills: true,
        strengths: true,
      },
    })
  })
  it('Should handle errors when getting full resume by id', async () => {
    prismaMock.resume.findUniqueOrThrow.mockRejectedValueOnce(error)
    await expect(getResumeFull(resume.id)).resolves.toBeUndefined()
    expect(console.error).toHaveBeenCalledWith(error)
    expect(mockNotFound).toHaveBeenCalled()
  })
  it('Should create a blank new resume and redirect', async () => {
    prismaMock.resume.create.mockResolvedValueOnce(resume)
    await expect(createResumeAction()).resolves.toBeUndefined()
    expect(prismaMock.resume.create).toHaveBeenCalledWith({ data: {} })
    expect(mockRedirect).toHaveBeenCalledWith(`/resume/${resume.id}/personal`)
  })
  it('Should handle errors when creating a new resume', async () => {
    prismaMock.resume.create.mockRejectedValueOnce(error)
    await expect(createResumeAction()).resolves.toBeUndefined()
    expect(console.error).toHaveBeenCalledWith(error)
    expect(mockRedirect).not.toHaveBeenCalled()
  })
  it('Should delete a resume', async () => {
    await deleteResume(resume.id)
    expect(prismaMock.resume.delete).toHaveBeenCalledWith({
      where: { id: resume.id },
    })
    expect(mockRevalidatePath).toHaveBeenCalledWith('/')
  })
  it('Should handle errors when deleting a resume', async () => {
    prismaMock.resume.delete.mockRejectedValueOnce(error)
    await deleteResume(resume.id)
    expect(console.error).toHaveBeenCalledWith(error)
  })
  it('Should not generate resume preview if feature not enabled', async () => {
    process.env.GENERATE_RESUME_SCREENSHOTS = 'false'
    await generateResumePreview(resume.id)
    expect(mockGenerateScreenshot).not.toHaveBeenCalled()
  })
  it('Should generate resume preview if feature is enabled', async () => {
    process.env.GENERATE_RESUME_SCREENSHOTS = 'true'
    await generateResumePreview(resume.id)
    expect(mockGenerateScreenshot).toHaveBeenCalledWith(resume.id, `previews/${resume.id}`)
    expect(mockRevalidatePath).toHaveBeenCalledWith(`/resume/${resume.id}/`)
  })
  it('Should handle errors when generating resume preview', async () => {
    process.env.GENERATE_RESUME_SCREENSHOTS = 'true'
    mockGenerateScreenshot.mockRejectedValueOnce(error)
    await generateResumePreview(resume.id)
    expect(console.error).toHaveBeenCalledWith(error)
  })
})
