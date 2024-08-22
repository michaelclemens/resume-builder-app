import { sanitize } from 'isomorphic-dompurify'

export default function RenderHtml({ html }: { html: string }) {
  const createMarkup = (dirty: string) => ({ __html: sanitize(dirty) })

  return (
    <div className="ql-snow no-tailwindcss">
      <div className="ql-editor" style={{ padding: 0 }} dangerouslySetInnerHTML={createMarkup(html)} />
    </div>
  )
}
