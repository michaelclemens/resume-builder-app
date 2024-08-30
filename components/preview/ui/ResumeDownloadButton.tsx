import { Loading } from '@/components/ui'
import CtaButton from '@/components/ui/CtaButton'
import { downloadPDF } from '@/util/print'
import { useState } from 'react'
import { FaDownload } from 'react-icons/fa'

export default function ResumeDownloadButton({ resumeId, filename = 'My Resume' }: { resumeId: string; filename?: string }) {
  const [downloading, setDownloading] = useState(false)

  const onDownload = async () => {
    setDownloading(true)
    try {
      const response = await fetch(`/api/resume/${resumeId}/pdf`)
      downloadPDF(await response.blob(), `${filename}.pdf`)
    } catch (error) {
      console.error(error)
    } finally {
      setDownloading(false)
    }
  }

  return (
    <>
      <CtaButton title="Download Resume PDF" onClick={onDownload}>
        <FaDownload size="0.5em" className="mr-3 text-green-700 dark:text-indigo-500" />
        <span className="text-xl">Download</span>
      </CtaButton>
      {downloading && <Loading />}
    </>
  )
}
