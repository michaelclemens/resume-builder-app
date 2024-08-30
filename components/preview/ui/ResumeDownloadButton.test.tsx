import { fireEvent, render, waitFor } from '@testing-library/react'
import cuid from 'cuid'
import ResumeDownloadButton from './ResumeDownloadButton'
import { faker } from '@faker-js/faker'
import { downloadPDF } from '@/util/print'

jest.mock('@/util/print')
const blob = new Blob([faker.lorem.sentence()], { type: 'application/pdf' })
const fetch = jest.fn(() =>
  Promise.resolve({
    blob: () => Promise.resolve(blob),
  })
)
// @ts-ignore
global.fetch = fetch
const resumeId = cuid()
const mockDownloadPDF = jest.mocked(downloadPDF)

describe('ResumeDownloadButtonComponent', () => {
  it('Should render download button', () => {
    const { getByRole } = render(<ResumeDownloadButton resumeId={resumeId} />)
    expect(getByRole('button', { name: /download resume pdf/i })).toBeInTheDocument()
  })
  it('Should download resume', async () => {
    const filename = faker.lorem.word()
    const { getByRole } = render(<ResumeDownloadButton resumeId={resumeId} filename={filename} />)

    fireEvent.click(getByRole('button', { name: /download resume pdf/i }))

    expect(fetch).toHaveBeenCalledWith(`/api/resume/${resumeId}/pdf`)
    await waitFor(() => expect(mockDownloadPDF).toHaveBeenCalledWith(blob, `${filename}.pdf`))
  })
})
