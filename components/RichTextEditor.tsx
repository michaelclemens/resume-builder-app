'use client'

import dynamic from "next/dynamic";
import { useState } from "react";

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

export default function RichTextEditor({ name, defaultValue = '' }: { name: string, defaultValue?: string }) {
    const [value, setValue] = useState(defaultValue);
    
    return (
        <>
            <ReactQuill defaultValue={defaultValue} onChange={setValue} />
            <textarea hidden name={name} value={value} readOnly />
        </>
    )
}