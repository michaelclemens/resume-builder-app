'use client'

import dynamic from 'next/dynamic'
import { FieldValues, useController, UseControllerProps } from 'react-hook-form'
import { richTextEditorClassName } from '@/util/form'
import Loading from '../Loading'
import ErrorMessage from './ErrorMessage'
import styles from './RichTextEditor.module.css'

const ReactQuill = dynamic(() => import('react-quill-new'), { loading: () => <Loading showSpinner={false} />, ssr: false })

const toolbarOptions = [
  [{ header: [1, 2, 3, false] }],
  ['bold', 'italic', 'underline', 'strike'],
  [{ list: 'bullet' }, { list: 'ordered' }, { indent: '-1' }, { indent: '+1' }],
  ['blockquote', 'code-block'],
  [{ align: [] }, { color: [] }, { background: [] }],
]

export const disabledClass = 'opacity-50 select-none'

export default function RichTextEditor<T extends FieldValues>({ name, control, placeholder = '' }: UseControllerProps<T> & { placeholder?: string }) {
  const {
    field: { value, onChange },
    fieldState: { error },
    formState: { isSubmitting },
  } = useController({ name, control })
  return (
    <div aria-label={name} className={`relative mb-3 min-h-24 ${isSubmitting ? disabledClass : ''}`}>
      <ReactQuill
        className={`${richTextEditorClassName} ${styles.quill} text-gray-700 dark:text-white`}
        placeholder={placeholder}
        value={value}
        onChange={value => onChange(value)}
        modules={{ toolbar: toolbarOptions }}
        readOnly={isSubmitting}
      />
      <ErrorMessage error={error} />
    </div>
  )
}
