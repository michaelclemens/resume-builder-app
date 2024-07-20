import RichTextEditor from "../RichTextEditor";

type InputTypes = 'text'|'email'|'phone'|'date'|'rte';

export default function InputText(
    { name, label, type = 'text', defaultValue = '', required = false, disabled = false }: 
    { name: string, label: string, type?: InputTypes, defaultValue?: string, required?: boolean, disabled?: boolean }
) {
    if (type === 'rte') {
        return (
            <div className="mb-3">
                <label htmlFor={name} className="pl-3 text-xs text-gray-700">{label}</label>
                <RichTextEditor name={name} defaultValue={defaultValue} disabled={disabled} />
            </div>
        )
    }
    
    return (
        <label
            htmlFor={name}
            className="relative block overflow-hidden mb-3 rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
        >
            <input
                type={type}
                name={name}
                className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm disabled:opacity-50 disabled:pointer-events-none"
                placeholder={label}
                defaultValue={defaultValue}
                required={required}
                disabled={disabled}
            />            

            <span
                className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs"
            >
                {label}{required && <span title="Required" className="text-red-600 ml-1">*</span>}
            </span>
        </label>
    )
}