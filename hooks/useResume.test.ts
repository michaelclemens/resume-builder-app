import { renderHookWithProviders } from '@/test/redux'
import useResume from './useResume'
import { createMockResume } from '@/test/mocks'
import { generateResumePreview, updateResume } from '@/lib/client/resume'
import { waitFor } from '@testing-library/react'
import { Template } from '@prisma/client'
import { faker } from '@faker-js/faker'

jest.mock('@/lib/client/resume')

const mockUpdateResume = jest.mocked(updateResume)
const mockGeneratePreview = jest.mocked(generateResumePreview)

const resume = createMockResume()

describe('useResumeHook', () => {
  it('Should return null if no state or passed in resume', () => {
    const { result } = renderHookWithProviders(() => useResume())
    expect(result.current).toEqual(expect.objectContaining({ resume: null }))
  })
  it('Should set resume to state and return it if no state', () => {
    const { result, store } = renderHookWithProviders(() => useResume({ initialResume: resume }))
    expect(result.current).toEqual(expect.objectContaining({ resume }))
    expect(store.getState().resume).toEqual(resume)
  })
  it('Should return resume from state', () => {
    const stateResume = createMockResume()
    const { result } = renderHookWithProviders(() => useResume({ initialResume: resume }), {
      preloadedState: { resume: stateResume },
    })
    expect(result.current).toEqual(expect.objectContaining({ resume: stateResume }))
  })
  it('Should update resume template', async () => {
    const { result, store } = renderHookWithProviders(() => useResume({ initialResume: resume }))

    const newTemplate = resume.template === Template.DEFAULT ? Template.COMPACT : Template.DEFAULT
    await waitFor(() => result.current.updateTemplate(resume.id, newTemplate))

    expect(mockUpdateResume).toHaveBeenCalledWith(resume.id, { template: newTemplate })
    expect(store.getState().resume).toEqual(expect.objectContaining({ template: newTemplate }))
  })
  it('Should update resume template options', async () => {
    resume.templateOptions = { colours: { background: faker.color.rgb({ format: 'hex' }) }}
    const { result, store } = renderHookWithProviders(() => useResume({ initialResume: resume }))

    const newTemplateOptions = { colours: { ...(resume.templateOptions?.colours as object), text: faker.color.rgb({ format: 'hex' }) } }
    await waitFor(() => result.current.updateTemplateOptions(resume.id, newTemplateOptions))

    expect(mockUpdateResume).toHaveBeenCalledWith(resume.id, { templateOptions: newTemplateOptions })
    expect(store.getState().resume).toEqual(expect.objectContaining({ templateOptions: newTemplateOptions }))
  })
  it('Should generate resume preview image if variable is enabled', async () => {
    process.env.GENERATE_RESUME_SCREENSHOTS = 'false'
    const { result } = renderHookWithProviders(() => useResume({ initialResume: resume }))

    await waitFor(() => result.current.updateTemplate(resume.id, resume.template))
    await waitFor(() => result.current.updateTemplateOptions(resume.id, { colours: { background: faker.color.rgb({ format: 'hex' }) } }))

    expect(mockGeneratePreview).not.toHaveBeenCalled()

    process.env.GENERATE_RESUME_SCREENSHOTS = 'true'

    await waitFor(() => result.current.updateTemplate(resume.id, resume.template))
    await waitFor(() => result.current.updateTemplateOptions(resume.id, { colours: { background: faker.color.rgb({ format: 'hex' }) } }))

    expect(mockGeneratePreview).toHaveBeenNthCalledWith(1, resume.id)
    expect(mockGeneratePreview).toHaveBeenNthCalledWith(2, resume.id)
  })
  it('Should clear resume template options', async () => {
    const { result, store } = renderHookWithProviders(() =>
      useResume({ initialResume: { ...resume, templateOptions: { colours: { background: faker.color.rgb({ format: 'hex' }) } } } })
    )

    await waitFor(() => result.current.updateTemplateOptions(resume.id, null))

    expect(mockUpdateResume).toHaveBeenCalledWith(resume.id, { templateOptions: undefined })
    expect(store.getState().resume).toEqual(expect.objectContaining({ templateOptions: null }))
  })
})
