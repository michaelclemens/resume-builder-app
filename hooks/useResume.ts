'use client'

import { useAppDispatch, useAppSelector } from '@/lib/redux/store'
import { Resume, Template } from '@prisma/client'
import { selectResume, setResume, setTemplate, setTemplateOptions } from '@/lib/redux/reducers/resume'
import { useEffect } from 'react'
import { generateResumePreview, updateResume } from '@/lib/client/resume'
import { TemplateOptions } from '@/types/template'

export default function useResume({ initialResume }: { initialResume?: Resume | null } = {}) {
  const resume = useAppSelector(selectResume)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (initialResume && !resume) {
      console.log('setting resume...')
      dispatch(setResume(initialResume))
    }
  }, [dispatch, initialResume, resume])

  const updateTemplate = async (resumeId: string, template: Template) => {
    await updateResume(resumeId, { template })
    dispatch(setTemplate(template))
    if (process.env.GENERATE_RESUME_SCREENSHOTS === 'true') generateResumePreview(resumeId)
  }

  const updateTemplateOptions = async (resumeId: string, templateOptions: TemplateOptions) => {
    await updateResume(resumeId, { templateOptions: templateOptions ?? undefined })
    dispatch(setTemplateOptions(templateOptions))
    if (process.env.GENERATE_RESUME_SCREENSHOTS === 'true') generateResumePreview(resumeId)
  }

  return { resume: resume ?? initialResume ?? null, updateTemplate, updateTemplateOptions }
}
