'use client'

import Loading from "@/app/loading";
import dynamic from "next/dynamic";
import { FieldValues, useController, UseControllerProps } from "react-hook-form";
import 'react-quill/dist/quill.snow.css';
import ErrorMessage from "./ErrorMessage";

const ReactQuill = dynamic(() => import('react-quill'), { loading: () => <Loading/>, ssr: false });

const toolbarOptions = [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'bullet' }, { 'list': 'ordered'}, { 'indent': '-1'}, { 'indent': '+1' }],
    ['blockquote', 'code-block'],
    [{ 'align': [] }, { 'color': [] }, { 'background': [] }],
]

export default function <T extends FieldValues>(
    { name, control, placeholder = '' }: 
    UseControllerProps<T> & { placeholder?: string }
) {
    const { field: { value, onChange }, fieldState: { error }, formState: { isSubmitting} } = useController({ name, control });
    return (
        <div className={`mb-3 min-h-24 ${isSubmitting ? 'opacity-50 pointer-events-none' : ''}`}>
            <ReactQuill           
                placeholder={placeholder}
                value={value} 
                onChange={(value) => onChange(value)} 
                modules={{ toolbar: toolbarOptions }} 
                readOnly={isSubmitting}
                className="bg-white"
            />
            <ErrorMessage error={error} />
        </div>
    )
}