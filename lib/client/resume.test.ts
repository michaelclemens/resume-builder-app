import { createMockFullResume, createMockResume, createMultipleMockItems } from "@/test/mocks";
import { prismaMock } from "@/test/prisma";
import { faker } from "@faker-js/faker";
import { Resume, Template } from "@prisma/client";
import { createResumeAction, getAllResumes, getResume, getResumeFull, updateResume } from "./resume";
import { redirect } from "next/navigation";

jest.mock('@/lib/prisma');
jest.mock('next/navigation')

const mockRedirect = jest.mocked(redirect);
console.error = jest.fn();
const getFormData = (resume: Resume) => ({
    template: resume.template ?? Template.DEFAULT,
    templateOptions: resume.templateOptions ?? null,
})
const getDbData = (resume: Resume) => ({
    ...getFormData(resume)
})

describe('ResumeClient', () => {
    it('Should get resume by id', async () => {
        const resume = createMockResume();

        prismaMock.resume.findUniqueOrThrow.mockResolvedValueOnce(resume);

        await expect(getResume(resume.id)).resolves.toEqual(resume);
        expect(prismaMock.resume.findUniqueOrThrow).toHaveBeenCalledWith({ where: { id: resume.id }});
    })
    it('Should handle errors when getting resume by id', async () => {
        const id = faker.string.alphanumeric({ length: 5 });
        const error = new Error(faker.lorem.sentence());

        prismaMock.resume.findUniqueOrThrow.mockRejectedValueOnce(error);

        await expect(getResume(id)).resolves.toBeNull();
        expect(console.error).toHaveBeenCalledWith(error);
    })
    it('Should update a resume', async () => {
        const resume = createMockResume();
        
        prismaMock.resume.update.mockResolvedValueOnce(resume);

        await expect(updateResume(resume.id, getFormData(resume))).resolves.toEqual(resume);
        expect(prismaMock.resume.update).toHaveBeenCalledWith({
            where: { id: resume.id },
            data: getDbData(resume)
        });
    })
    it('Should handle errors when updating a resume', async () => {
        const resume = createMockResume();
        const error = new Error(faker.lorem.sentence());
        
        prismaMock.resume.update.mockRejectedValueOnce(error);

        await expect(updateResume(resume.id, getFormData(resume))).resolves.toBeNull();
        expect(console.error).toHaveBeenCalledWith(error);
    })
    it('Should get all resumes', async () => {
        const resumes = createMultipleMockItems(createMockResume, 5);

        prismaMock.resume.findMany.mockResolvedValueOnce(resumes);

        await expect(getAllResumes()).resolves.toEqual(resumes);
        expect(prismaMock.resume.findMany).toHaveBeenCalledWith({
            take: 10,
            orderBy: { createdAt: 'asc' }
        })
    })
    it('Should handle errors when getting all resumes', async () => {
        const error = new Error(faker.lorem.sentence());

        prismaMock.resume.findMany.mockRejectedValueOnce(error);

        await expect(getAllResumes()).resolves.toEqual([]);
        expect(console.error).toHaveBeenCalledWith(error);
    })
    it('Should get a full (all includes) resume', async () => {
        const resume = createMockFullResume();

        prismaMock.resume.findUniqueOrThrow.mockResolvedValueOnce(resume);

        await expect(getResumeFull(resume.id)).resolves.toEqual(resume);
        expect(prismaMock.resume.findUniqueOrThrow).toHaveBeenCalledWith({ 
            where: { id: resume.id },
            include: {
                personal: true,
                employments: { include: { history: true }},
                educations: true,
                skills: true,
                strengths: true
            }
        });
    })
    it('Should create a blank new resume and redirect', async () => {
        const resume = createMockResume();

        prismaMock.resume.create.mockResolvedValueOnce(resume);

        await expect(createResumeAction()).resolves.toBeUndefined();
        expect(prismaMock.resume.create).toHaveBeenCalledWith({ data: {} });
        expect(mockRedirect).toHaveBeenCalledWith(`/resume/${resume.id}`);
    })
    it('Should handle errors when creating a new resume', async () => {
        const error = new Error(faker.lorem.sentence());

        prismaMock.resume.create.mockRejectedValueOnce(error);

        await expect(createResumeAction()).resolves.toBeUndefined();
        expect(console.error).toHaveBeenCalledWith(error);
        expect(mockRedirect).not.toHaveBeenCalled();
    })
})