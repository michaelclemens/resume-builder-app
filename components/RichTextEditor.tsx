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

export default function RichTextEditor({ name, defaultValue = '' }: { name: string, defaultValue?: string }) {
    const [value, setValue] = useState(defaultValue);
    
    return (
        <>
            <ReactQuill defaultValue={defaultValue} onChange={setValue} modules={{ toolbar: toolbarOptions }} />
            <textarea hidden name={name} value={value} readOnly />
        </>
    )
}