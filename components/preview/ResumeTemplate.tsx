'use client'

import { Ref, RefObject } from 'react'
import { ResumeFull } from '@/lib/client/resume'
import { getTemplateComponent, getTemplateConfig, TemplateConfigContext } from '@/util/template'
import { resumePrintPreviewID } from '@/types/template'
import Footer from '../templates/util/Footer'
import ResumeColourPicker from './ui/ResumeColourPicker'

export const resumePrintFooterClass = 'resume-print-footer'

export default function ResumeTemplate({
  resume,
  resumePreviewRef,
  colourElementRef,
}: {
  resume: ResumeFull
  resumePreviewRef?: Ref<HTMLDivElement>
  colourElementRef?: RefObject<HTMLDivElement>
}) {
  const ResumeTemplateComponent = getTemplateComponent(resume.template)
  const templateConfig = getTemplateConfig(resume.template, resume.templateOptions)
  return (
    <TemplateConfigContext.Provider value={templateConfig}>
      <div ref={resumePreviewRef} id={resumePrintPreviewID} className="relative w-[210mm]">
        <ResumeTemplateComponent resume={resume} colourElementRef={colourElementRef} />
        <Footer />
      </div>
      {colourElementRef && <ResumeColourPicker resumeId={resume.id} colourElementRef={colourElementRef} />}
    </TemplateConfigContext.Provider>
  )
}
