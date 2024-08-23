import { render } from '@testing-library/react'
import Experience from './Experience'
import { createMockSkill, regexString } from '@/test/mocks'

const skill = createMockSkill()

describe('SimpleExperienceComponent', () => {
  it('Should not render if no skills is passed', () => {
    const { container } = render(<Experience skills={[]} />)
    expect(container).toBeEmptyDOMElement()
  })
  it('Should render the correct heading', () => {
    const { getByText } = render(<Experience skills={[skill]} />)
    expect(getByText(regexString('experience'))).toBeInTheDocument()
  })
  it('Should render the correct details', () => {
    const { getByText } = render(<Experience skills={[skill]} />)
    expect(getByText(regexString(skill.name))).toBeInTheDocument()
  })
})
