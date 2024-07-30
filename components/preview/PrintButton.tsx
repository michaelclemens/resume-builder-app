import { FaPrint } from "react-icons/fa"
import { useReactToPrint } from "react-to-print";

export default ({ content, documentTitle }: { content: () => HTMLElement|null, documentTitle?: string }) => {
    const handlePrint = useReactToPrint({
        documentTitle,
        content: () => {
            const size = 1122;
            const element = content();
            const resumeHeight = element?.clientHeight;

            if (resumeHeight) {
               const ratio = resumeHeight / size;
                if (ratio > 1) {
                    const vhs = Math.ceil(parseFloat(ratio.toFixed(2)));
                    const newHeight = vhs * 100;
                    element.style.height = `${newHeight}vh`
                }
            }
            return element
        },
        onAfterPrint: () => {
            const element = content();
            if (element) {
                element.style.height = '';
            }
        }
    });
    
    return (
        <div className="absolute top-0 -right-12">
            <button onClick={handlePrint} className="fixed bg-gray-400 rounded-md px-2 py-2 ring-1 shadow-sm ring-gray-700 text-gray-800 transition-colors duration-500 hover:bg-gray-300" title="Print">
                <FaPrint size="1.75em"/>
            </button>
        </div>
    )
}