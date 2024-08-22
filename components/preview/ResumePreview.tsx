'use client'

import { ResumeFull } from '@/lib/client/resume'
import { useEffect, useRef } from 'react'
import { TemplateSwitcher } from '@/components/ui'
import ResumeTemplate from './ResumeTemplate'
import useResumePreview from '@/hooks/useResumePreview'
import ResumePrintButton from './ResumePrintButton'
import ResumeDownloadButton from './ResumeDownloadButton'
import ResumeColourPicker from './ResumeColourPicker'

export default function ResumePreview({ resume: initialResume }: { resume: ResumeFull }) {
  const { resume, resetAllState } = useResumePreview(initialResume)
  const resumePreviewRef = useRef<HTMLDivElement | null>(null)
  const colourElementRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    return () => {
      console.log('unmounting...')
      resetAllState()
    }
  }, [resetAllState])

  return (
    <div className="relative my-3 ml-1 flex flex-shrink">
      <div className="relative z-40 flex flex-shrink rounded-lg px-12 py-10 shadow-md ring-1 ring-slate-300/60 backdrop-blur-sm dark:ring-slate-400/20">
        <ResumeTemplate
          // @ts-ignore
          resume={resume}
          resumePreviewRef={resumePreviewRef}
          colourElementRef={colourElementRef}
        />
        <ResumeColourPicker resume={resume} colourElementRef={colourElementRef} />
      </div>
      <div className="mt-5 flex w-full justify-center text-center">
        <div className="fixed">
          <ResumePrintButton resumePreviewRef={resumePreviewRef} />
          <ResumeDownloadButton resumeId={resume.id} />
          <TemplateSwitcher resumeId={resume.id} template={resume.template} />
        </div>
      </div>
    </div>
  )
}
