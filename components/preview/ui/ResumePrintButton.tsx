import { RefObject, useState } from 'react'
import { FaPrint } from 'react-icons/fa'
import { useReactToPrint } from 'react-to-print'
import { Loading } from '@/components/ui'
import CtaButton from '@/components/ui/CtaButton'
import { fixPDFHeight } from '@/util/print'

export default function ResumePrintButton({
  resumePreviewRef,
  documentTitle,
}: {
  resumePreviewRef: RefObject<HTMLDivElement>
  documentTitle?: string
}) {
  const [printing, setPrinting] = useState(false)
  const handlePrint = useReactToPrint({
    documentTitle,
    onBeforePrint: async () => {
       setPrinting(true)
       fixPDFHeight(resumePreviewRef.current)
    },
    contentRef: resumePreviewRef,
    onAfterPrint: () => setPrinting(false),
  })

  return (
    <>
      <CtaButton title="Print Resume" onClick={handlePrint}>
        <FaPrint size="0.5em" className="mr-3 text-green-700 dark:text-indigo-500" />
        <span className="text-xl">Print</span>
      </CtaButton>
      {printing && <Loading />}
    </>
  )
}
