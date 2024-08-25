import CtaButton from '@/components/ui/CtaButton'
import { fixPDFHeight } from '@/util/print'
import { RefObject } from 'react'
import { FaPrint } from 'react-icons/fa'
import { useReactToPrint } from 'react-to-print'

export default function ResumePrintButton({
  resumePreviewRef,
  documentTitle,
}: {
  resumePreviewRef: RefObject<HTMLDivElement>
  documentTitle?: string
}) {
  const handlePrint = useReactToPrint({
    documentTitle,
    onBeforeGetContent: () => fixPDFHeight(resumePreviewRef.current),
    content: () => resumePreviewRef.current,
  })

  return (
    <CtaButton title="Print Resume" onClick={handlePrint}>
      <FaPrint size="0.5em" className="mr-3 text-green-700 dark:text-indigo-500" />
      <span className="text-xl">Print</span>
    </CtaButton>
  )
}
