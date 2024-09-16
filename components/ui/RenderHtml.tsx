import { sanitize } from 'isomorphic-dompurify'
import styles from './RenderHtml.module.css'

export default function RenderHtml({ html }: { html: string }) {
  const createMarkup = (dirty: string) => ({ __html: sanitize(dirty) })

  return (
    <div className={`${styles.noTailwind} ql-snow`}>
      <div className="ql-editor" style={{ padding: 0 }} dangerouslySetInnerHTML={createMarkup(html)} />
    </div>
  )
}
