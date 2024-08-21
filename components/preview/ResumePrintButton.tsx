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
    <button
      onClick={handlePrint}
      className='rounded-md bg-gray-400 px-2 py-2 text-gray-800 shadow-sm ring-1 ring-gray-700 transition-colors duration-500 hover:bg-gray-300'
      title='Print'
    >
      <FaPrint size='1.75em' />
    </button>
  )
}
