'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import { sanitize } from 'isomorphic-dompurify'
import { useEffect } from 'react'
import { extensions } from './form/RichTextEditor'

export default function RichTextViewer({ value }: { value: string }) {
  const editor = useEditor({
    extensions,
    editable: false,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'prose prose-sm',
      },
    },
  })

  useEffect(() => {
    if (editor && editor.getHTML() !== value) {
      editor.commands.setContent(sanitize(value))
    }
  }, [value, editor])

  return <EditorContent editor={editor} />
}
