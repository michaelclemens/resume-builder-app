import { FaDownload } from "react-icons/fa";

const downloadPDF = (blob: Blob, filename: string) => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.style.display = 'none';
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
}

export default function ResumeDownloadButton({ resumeId, filename = 'My Resume' }: { resumeId: string, filename?: string }) {
    const onDownload = async () => {
        const response = await fetch(`/api/resume/${resumeId}/pdf`);
        downloadPDF(await response.blob(), `${filename}.pdf`)
    }

    return (
        <button onClick={onDownload} className="bg-gray-400 rounded-md px-2 py-2 ring-1 shadow-sm ring-gray-700 text-gray-800 transition-colors duration-500 hover:bg-gray-300" title="Download PDF">
            <FaDownload size="1.75em" />
        </button>
    )
}