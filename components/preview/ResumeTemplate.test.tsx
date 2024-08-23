import { createMockFullResume } from '@/test/mocks'
import { render } from '@testing-library/react'
import ResumeTemplate, { resumePrintFooterClass } from './ResumeTemplate'
import { createRef } from 'react'
import { resumePrintPreviewID } from '@/util/template'

jest.mock('@/components/templates')

const resume = createMockFullResume()

describe('ResumeTemplateComponent', () => {
  it('Should render as required for the print preview', () => {
    const resumePreviewRef = createRef<HTMLDivElement>()
    const { getByTitle } = render(<ResumeTemplate resume={resume} resumePreviewRef={resumePreviewRef} />)

    expect(resumePreviewRef.current).toBeInTheDocument()
    expect(resumePreviewRef.current).toHaveProperty('id', resumePrintPreviewID)
    expect(resumePreviewRef.current).toHaveClass('w-[210mm]')
    const footer = getByTitle(/resume print footer/i)
    expect(footer).toBeInTheDocument()
    expect(footer).toHaveClass(resumePrintFooterClass)
  })
})
