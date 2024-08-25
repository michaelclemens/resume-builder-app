import { fireEvent, render } from '@testing-library/react'
import cuid from 'cuid'
import ResumeDownloadButton from './ResumeDownloadButton'
import { faker } from '@faker-js/faker'

const blob = faker.lorem.sentence()
const fetch = jest.fn(() =>
  Promise.resolve({
    blob: () => Promise.resolve(new Blob([blob], { type: 'application/pdf' })),
  })
)
// @ts-ignore
global.fetch = fetch
const resumeId = cuid()

describe('ResumeDownloadButtonComponent', () => {
  it('Should render download button', () => {
    const { getByRole } = render(<ResumeDownloadButton resumeId={resumeId} />)
    expect(getByRole('button', { name: /download resume pdf/i })).toBeInTheDocument()
  })
  it('Should download resume', async () => {
    const filename = faker.lorem.word()
    const { getByRole } = render(<ResumeDownloadButton resumeId={resumeId} filename={filename} />)

    window.URL.createObjectURL = jest.fn()
    window.URL.revokeObjectURL = jest.fn()
    document.body.appendChild = jest.fn()
    document.body.removeChild = jest.fn()
    document.createElement = jest.fn().mockImplementation(() => ({ setAttribute: jest.fn(), click: jest.fn() }))

    fireEvent.click(getByRole('button', { name: /download resume pdf/i }))

    expect(fetch).toHaveBeenCalledWith(`/api/resume/${resumeId}/pdf`)
  })
})
