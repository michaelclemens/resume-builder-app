import { EmploymentHistory } from '@prisma/client'
import { title } from 'process'
import { useCallback } from 'react'
import { SectionEnums } from '@/types/section'
import { ResumeFull } from '@/lib/client/resume'
import { reset } from '@/lib/redux/reducers/resume'
import { useAppDispatch } from '@/lib/redux/store'
import { getSection } from '@/util/section'
import useResume from './useResume'
import useSectionItem from './useSectionItem'
import useSectionList from './useSectionList'

export default function useResumePreview(initialFullResume: ResumeFull) {
  const initialResume = {
    id: initialFullResume.id,
    title: initialFullResume.title,
    template: initialFullResume.template,
    templateOptions: initialFullResume.templateOptions,
    createdAt: initialFullResume.createdAt,
    updatedAt: initialFullResume.updatedAt,
  }
  const { resume } = useResume({ initialResume })
  const dispatch = useAppDispatch()

  let initialHistories: EmploymentHistory[] = []
  initialFullResume.employments.forEach(employment => {
    employment.history.forEach(history => {
      initialHistories.push(history)
    })
  })

  const { item: personal } = useSectionItem(SectionEnums.personal, { initialItem: initialFullResume.personal })
  const { items: employments } = useSectionList(SectionEnums.employment, { initialItems: initialFullResume.employments })
  const { items: histories } = useSectionList(SectionEnums.employmentHistory, { initialItems: initialHistories })
  const { items: educations } = useSectionList(SectionEnums.education, { initialItems: initialFullResume.educations })
  const { items: skills } = useSectionList(SectionEnums.skill, { initialItems: initialFullResume.skills })
  const { items: strengths } = useSectionList(SectionEnums.strength, { initialItems: initialFullResume.strengths })

  const resetAllState = useCallback(() => {
    // @ts-ignore
    dispatch(reset())
    dispatch(getSection(SectionEnums.personal).state.actions.reset())
    dispatch(getSection(SectionEnums.education).state.actions.reset())
    dispatch(getSection(SectionEnums.employment).state.actions.reset())
    dispatch(getSection(SectionEnums.employmentHistory).state.actions.reset())
    dispatch(getSection(SectionEnums.skill).state.actions.reset())
    dispatch(getSection(SectionEnums.strength).state.actions.reset())
  }, [dispatch])

  return {
    resume: {
      ...(resume ?? initialResume),
      personal,
      employments,
      histories,
      educations,
      skills,
      strengths,
    },
    resetAllState,
  }
}
