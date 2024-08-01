import { FaPrint } from "react-icons/fa"
import { useReactToPrint } from "react-to-print";

export default ({ getContent, documentTitle, onBeforePrint }: { getContent: () => HTMLElement|null, documentTitle?: string, onBeforePrint?: () => void }) => {
    const handlePrint = useReactToPrint({
        documentTitle,
        onBeforeGetContent: onBeforePrint,
        content: getContent
    });
    
    return (
        <button onClick={handlePrint} className="bg-gray-400 rounded-md px-2 py-2 ring-1 shadow-sm ring-gray-700 text-gray-800 transition-colors duration-500 hover:bg-gray-300" title="Print">
            <FaPrint size="1.75em"/>
        </button>
    )
}