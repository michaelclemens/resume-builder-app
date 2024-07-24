import { FaEdit, FaTrashAlt } from "react-icons/fa";

type ButtonTypes = 'edit'|'delete';

export default function ListButton({ label = '', type, onClick = () => {} }: { label?: string|JSX.Element, type?: ButtonTypes, onClick?: () => void }) {
    let button = null;
    let className = '';
    switch(type) {
        case 'edit':
            button = <FaEdit/>
            className="hover:text-blue-600"
            break;
        case 'delete':
            button = <FaTrashAlt/>
            className="hover:text-red-600"
            break;
        default:
            button = label;
            break;
    }

    const paddingY = typeof button === "string" ? 'py-1' : 'py-2';
    return (
        <button onClick={onClick} className={`rounded-md px-2 ${paddingY} font-medium shadow-sm ring-1 ring-slate-700/10 hover:bg-slate-50 text-gray-700 transition-colors duration-500 ${className}`}>
            {button}
        </button>
    )
}