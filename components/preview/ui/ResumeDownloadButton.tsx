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
    <button
      onClick={onDownload}
      className="rounded-md bg-gray-400 px-2 py-2 text-gray-800 shadow-sm ring-1 ring-gray-700 transition-colors duration-500 hover:bg-gray-300"
      title="Download PDF"
    >
      <FaDownload size="1.75em" />
    </button>
  )
}
