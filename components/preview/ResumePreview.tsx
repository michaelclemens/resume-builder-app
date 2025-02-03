'use client'

import { useEffect, useRef } from 'react'
import { ResumeFull } from '@/lib/client/resume'
import useResumePreview from '@/hooks/useResumePreview'
import { TemplateSwitcher } from '@/components/ui'
import ResumeTemplate from './ResumeTemplate'
import ResumeDownloadButton from './ui/ResumeDownloadButton'
import ResumePrintButton from './ui/ResumePrintButton'

export default function ResumePreview({ resume: initialResume }: { resume: ResumeFull }) {
  const { resume, resetAllState } = useResumePreview(initialResume)
  const resumePreviewRef = useRef<HTMLDivElement | null>(null)
  const colourElementRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    return () => {
      resetAllState()
    }
  }, [resetAllState])

  const title = `${resume.personal?.firstName} ${resume.personal?.lastName} CV`

  return (
    <div className="relative my-3 ml-1 flex">
      <div className="relative z-40 rounded-lg px-12 py-10 ring-1 shadow-md ring-slate-300/60 backdrop-blur-sm dark:ring-slate-400/20">
        <ResumeTemplate resume={resume} resumePreviewRef={resumePreviewRef} colourElementRef={colourElementRef} />
      </div>
      <div className="flex w-full justify-center text-center">
        <div className="fixed -mt-3 h-screen px-5">
          <ResumePrintButton resumePreviewRef={resumePreviewRef} documentTitle={title} />
          <ResumeDownloadButton resumeId={resume.id} filename={title} />
          <div className="scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-300/70 dark:scrollbar-thumb-slate-900/70 mt-5 h-4/6 overflow-y-auto px-2 pt-1">
            <TemplateSwitcher resumeId={resume.id} template={resume.template} />
          </div>
        </div>
      </div>
    </div>
  )
}
