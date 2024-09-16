'use client'

import { Ref, RefObject, Suspense } from 'react'
import { resumePrintPreviewID } from '@/types/template'
import { ResumeFull } from '@/lib/client/resume'
import { getTemplateComponent, getTemplateConfig, TemplateConfigContext } from '@/util/template'
import Footer from '../templates/util/Footer'
import { Loading } from '../ui'
import styles from './ResumeTemplate.module.css'
import ResumeColourPicker from './ui/ResumeColourPicker'

export default function ResumeTemplate({
  resume,
  resumePreviewRef,
  colourElementRef,
}: {
  resume: ResumeFull
  resumePreviewRef?: Ref<HTMLDivElement>
  colourElementRef?: RefObject<HTMLDivElement>
}) {
  const templateConfig = getTemplateConfig(resume.template, resume.templateOptions)
  const ResumeTemplateComponent = getTemplateComponent(resume.template)
  return (
    <TemplateConfigContext.Provider value={templateConfig}>
      <div ref={resumePreviewRef} id={resumePrintPreviewID} className={`${styles.print} relative min-h-screen w-[210mm]`}>
        <Suspense fallback={<Loading />}>
          <ResumeTemplateComponent resume={resume} colourElementRef={colourElementRef} />
        </Suspense>
        <Footer />
      </div>
      {colourElementRef && <ResumeColourPicker resumeId={resume.id} colourElementRef={colourElementRef} />}
    </TemplateConfigContext.Provider>
  )
}
