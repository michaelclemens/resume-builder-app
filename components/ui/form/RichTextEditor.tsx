'use client'

import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import { useEditor, EditorContent, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect } from 'react'
import { FieldValues, useController, UseControllerProps } from 'react-hook-form'
import {
  FaAlignCenter,
  FaAlignLeft,
  FaAlignRight,
  FaBold,
  FaCode,
  FaItalic,
  FaListOl,
  FaListUl,
  FaQuoteRight,
  FaStrikethrough,
  FaUnderline,
} from 'react-icons/fa'
import { richTextEditorClassName } from '@/util/form'
import ErrorMessage from './ErrorMessage'

export const extensions = [StarterKit, Underline, TextAlign.configure({ types: ['heading', 'paragraph'] })]

const activeBtnClass = 'text-gray-300 dark:text-gray-500'
const Menu = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return
  return (
    <div className="mx-5 mb-0 mt-5 flex gap-x-5 border-b border-b-gray-200 pb-4 text-gray-700 dark:border-b-slate-600 dark:text-white">
      <div className="flex gap-x-2">
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? activeBtnClass : ''}>
          <FaBold />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? activeBtnClass : ''}>
          <FaItalic />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive('underline') ? activeBtnClass : ''}
        >
          <FaUnderline />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} className={editor.isActive('strike') ? activeBtnClass : ''}>
          <FaStrikethrough />
        </button>
      </div>
      <div className="flex gap-x-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? activeBtnClass : ''}
        >
          <FaListUl />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? activeBtnClass : ''}
        >
          <FaListOl />
        </button>
      </div>
      <div className="flex gap-x-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? activeBtnClass : ''}
        >
          <FaQuoteRight />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? activeBtnClass : ''}
        >
          <FaCode />
        </button>
      </div>
      <div className="flex gap-x-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={editor.isActive({ textAlign: 'left' }) ? activeBtnClass : ''}
        >
          <FaAlignLeft />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={editor.isActive({ textAlign: 'center' }) ? activeBtnClass : ''}
        >
          <FaAlignCenter />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={editor.isActive({ textAlign: 'right' }) ? activeBtnClass : ''}
        >
          <FaAlignRight />
        </button>
      </div>
    </div>
  )
}

export default function RichTextEditor<T extends FieldValues>({ name, control, placeholder = '' }: UseControllerProps<T> & { placeholder?: string }) {
  const {
    field: { value, onChange },
    fieldState: { error },
    formState: { isSubmitting },
  } = useController({ name, control })

  const editable = !isSubmitting

  const editor = useEditor({
    extensions: [
      ...extensions,
      Placeholder.configure({ placeholder, emptyEditorClass: 'before:content-[attr(data-placeholder)] before:opacity-50' }),
    ],
    content: value,
    editable,
    immediatelyRender: false,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: `${richTextEditorClassName} prose prose-sm sm:prose-base ml-5 mt-3 mb-5 mr-2 focus:outline-none dark:prose-invert max-h-40 overflow-y-auto scrollbar scrollbar-track-transparent scrollbar-thumb-slate-300/70 dark:scrollbar-thumb-slate-900/70`,
      },
    },
  })

  useEffect(() => {
    if (!editor) return
    if (editor.isEditable !== editable) {
      editor.setEditable(editable)
    }
  }, [editable, editor])

  return (
    <div
      aria-label={name}
      aria-disabled={!editable}
      className={`relative mb-3 min-h-24 rounded-md border border-gray-200 bg-white text-gray-700 shadow-sm focus-within:border-gray-400 focus-within:ring-1 focus-within:ring-gray-400 aria-disabled:select-none aria-disabled:opacity-50 dark:border-slate-600 dark:bg-slate-700 dark:text-white`}
    >
      <Menu editor={editor} />
      <EditorContent editor={editor} />
      <ErrorMessage error={error} />
    </div>
  )
}
