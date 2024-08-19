import { AvailableButtonTypes, ButtonType } from "@/types/list";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

export const labelYPaddingClass = 'py-1';
export const iconYPaddingClass = 'py-2';

export default function ListButton(
    { label = '', type, onClick }: 
    { label?: string|JSX.Element, type?: AvailableButtonTypes, onClick?: () => void }
) {
    let button = null;
    let className = '';
    switch(type) {
        case ButtonType.edit:
            button = <FaEdit title="Edit"/>
            className="hover:text-blue-600 dark:hover:text-blue-400"
            break;
        case ButtonType.delete:
            button = <FaTrashAlt title="Delete"/>
            className="hover:text-red-600 dark:hover:text-red-400"
            break;
        default:
            button = label;
            break;
    }

    const paddingY = typeof button === "string" ? labelYPaddingClass : iconYPaddingClass;
    return (
        <button onClick={onClick} className={`rounded-md px-2 ${paddingY} font-medium shadow-sm ring-1 ring-slate-300/60 dark:ring-slate-400/20 hover:bg-slate-200/70 transition-colors duration-500 text-white dark:hover:bg-slate-600/70 ${className}`}>
            {button}
        </button>
    )
}