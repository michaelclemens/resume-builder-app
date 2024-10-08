import { SectionType } from '@/types/section'
import { getClientSection } from '../lib/client/section'
import { getStateSection } from '../lib/redux/reducers/section'

export const getSection = <Name extends SectionType>(sectionType: Name) => ({
  state: getStateSection(sectionType),
  client: getClientSection(sectionType),
})
