import { FaPrint } from "react-icons/fa"
import { useReactToPrint } from "react-to-print";

const A4Heightpx = 1122;
const footerClassName = 'resume-print-footer';

export default ({ content, documentTitle }: { content: () => HTMLElement|null, documentTitle?: string }) => {
    const handlePrint = useReactToPrint({
        documentTitle,
        content: () => {
            const element = content();
            const resumeHeight = element?.clientHeight;

            if (resumeHeight) {
                const numberOfPages = Math.ceil(resumeHeight / A4Heightpx);
                if (numberOfPages > 1) {
                    const newHeight = A4Heightpx * numberOfPages;
                    element.style.height = `${newHeight}px`;
                }
            }

            const footer = document.createElement('div');
            footer.className = footerClassName;
            element?.appendChild(footer);

            return element
        },
        onAfterPrint: () => {
            const element = content();
            if (element) {
                element.style.height = '';
                element.querySelectorAll(`.${footerClassName}`).forEach(el => el.remove());
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