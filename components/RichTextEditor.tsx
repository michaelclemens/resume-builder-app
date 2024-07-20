'use client'

import dynamic from "next/dynamic";
import { useState } from "react";

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

const toolbarOptions = [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'bullet' }, { 'list': 'ordered'}, { 'indent': '-1'}, { 'indent': '+1' }],
    ['blockquote', 'code-block'],
    [{ 'align': [] }, { 'color': [] }, { 'background': [] }],
]

export default function RichTextEditor({ name, defaultValue = '', disabled = false }: { name: string, defaultValue?: string, disabled?: boolean }) {
    const [value, setValue] = useState(defaultValue);
    
    return (
        <div className={`${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
            <ReactQuill defaultValue={defaultValue} onChange={setValue} modules={{ toolbar: toolbarOptions }} readOnly={disabled} />
            <textarea hidden name={name} value={value} readOnly />
        </div>
    )
}