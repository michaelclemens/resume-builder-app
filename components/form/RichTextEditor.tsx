'use client'

import Loading from "@/app/loading";
import dynamic from "next/dynamic";
import { Control, FieldValues, useController, UseControllerProps } from "react-hook-form";
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { loading: () => <Loading/>, ssr: false });

const toolbarOptions = [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'bullet' }, { 'list': 'ordered'}, { 'indent': '-1'}, { 'indent': '+1' }],
    ['blockquote', 'code-block'],
    [{ 'align': [] }, { 'color': [] }, { 'background': [] }],
]

export default function <T extends FieldValues>(
    { name, control, placeholder = '', disabled = false }: 
    UseControllerProps<T> & { placeholder?: string }
) {
    const { field } = useController({ name, control });
    return (
        <div className={`mb-3 min-h-24 ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
            <ReactQuill           
                placeholder={placeholder.length > 0 ? `${placeholder}...` : ''}
                value={field.value} 
                onChange={(value) => field.onChange(value)} 
                modules={{ toolbar: toolbarOptions }} 
                readOnly={disabled}
                className="bg-white"
            />
        </div>
    )
}