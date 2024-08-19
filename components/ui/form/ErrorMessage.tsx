import { FieldError } from "react-hook-form";

export default function ErrorMessage({ error }: { error?: FieldError }) {
    return (error && <p role="alert" className="text-xs text-red-500 font-semibold ml-1 -mt-1 mb-1 italic">{error.message}</p>)
} 