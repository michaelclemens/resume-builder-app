import CtaButton from '@/components/ui/CtaButton'
import { FaDownload } from 'react-icons/fa'

const downloadPDF = (blob: Blob, filename: string) => {
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.setAttribute('style', 'display:none')
  link.setAttribute('href', url)
  link.setAttribute('download', filename)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}

export default function ResumeDownloadButton({ resumeId, filename = 'My Resume' }: { resumeId: string; filename?: string }) {
  const onDownload = async () => {
    const response = await fetch(`/api/resume/${resumeId}/pdf`)
    downloadPDF(await response.blob(), `${filename}.pdf`)
  }

  return (
    <CtaButton title="Download Resume PDF" onClick={onDownload}>
      <FaDownload size="0.5em" className="mr-3 text-green-700 dark:text-indigo-500" />
      <span className="text-xl">Download</span>
    </CtaButton>
  )
}
