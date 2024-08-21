import { render } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import RenderHtml from './RenderHtml'

describe('RenderHtmlComponent', () => {
  it('Should render Html', () => {
    const html = `<h1>${faker.lorem.word()}</h1><p>${faker.lorem.paragraph()}</p>`
    const { container } = render(<RenderHtml html={html} />)
    expect(container).toContainHTML(html)
  })
  it('Should sanitise the Html', () => {
    const paragraph = faker.lorem.paragraph()
    const iframe = '<iframe//src=jAva&Tab;script:alert(3)>'
    const html = `<p>${paragraph}${iframe}</p>`

    const { container } = render(<RenderHtml html={html} />)

    expect(container).toContainHTML(`<p>${paragraph}</p>`)
    expect(container).not.toContainHTML(iframe)
  })
})
