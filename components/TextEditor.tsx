import dynamic from "next/dynamic";
import { useState } from "react";

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

export default function TextEditor({ name, defaultValue = '' }: { name: string, defaultValue?: string }) {
    const [value, setValue] = useState(defaultValue);

    const onChange = (value: string) => {
        console.log('value', value);
        setValue(value);
    }

    return (
        <>
            <ReactQuill defaultValue={defaultValue} onChange={onChange} />
            <input type="hidden" name={name} value={value} />
        </>
    )
}