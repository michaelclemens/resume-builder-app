import { createMockFullResume } from '@/test/mocks'
import { render, waitFor } from '@testing-library/react'
import { createRef } from 'react'
import { resumePrintPreviewID } from '@/types/template'
import ResumeTemplate from './ResumeTemplate'

jest.mock('@/components/templates')

const resume = createMockFullResume()

describe('ResumeTemplateComponent', () => {
  it('Should render as required for the print preview', async () => {
    const resumePreviewRef = createRef<HTMLDivElement>()
    const { getByTitle } = render(<ResumeTemplate resume={resume} resumePreviewRef={resumePreviewRef} />)

    await waitFor(() => expect(resumePreviewRef.current).toBeInTheDocument())
    expect(resumePreviewRef.current).toHaveProperty('id', resumePrintPreviewID)
    expect(resumePreviewRef.current).toHaveClass('w-[210mm]')
    const footer = getByTitle(/resume print footer/i)
    expect(footer).toBeInTheDocument()
  })
})
