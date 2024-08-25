import { fireEvent, render, waitFor } from '@testing-library/react'
import ResumePrintButton from './ResumePrintButton'
import { createRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import { faker } from '@faker-js/faker'

jest.mock('react-to-print')
jest.mock('@/util/print')

const mockUseReactToPrint = jest.mocked(useReactToPrint)

describe('ResumePrintButtonComponent', () => {
  it('Should render print button', () => {
    const resumePreviewRef = createRef<HTMLDivElement>()
    const { getByRole } = render(<ResumePrintButton resumePreviewRef={resumePreviewRef} />)
    expect(getByRole('button', { name: /print resume/i })).toBeInTheDocument()
  })
  it('Should render the resume print preview', async () => {
    const content = faker.lorem.paragraph()
    const documentTitle = faker.lorem.word()
    const resumePreviewRef = createRef<HTMLDivElement>()
    const { getByRole } = render(
      <>
        <div ref={resumePreviewRef}>{content}</div>
        <ResumePrintButton resumePreviewRef={resumePreviewRef} documentTitle={documentTitle} />
      </>
    )

    await waitFor(() => fireEvent.click(getByRole('button', { name: /print resume/i })))

    expect(mockUseReactToPrint).toHaveBeenCalledWith(
      expect.objectContaining({
        documentTitle,
      })
    )
  })
})
