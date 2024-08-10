import useResume from "@/hooks/useResume"
import { Template } from "@prisma/client"

export default function TemplateSwitcher({ resumeId }: { resumeId: string }) {
    const { updateTemplate } = useResume();
    return (
        <div className="mt-10">
            {Object.keys(Template).map(template => (
                <div 
                    key={template} 
                    onClick={async() => updateTemplate(resumeId, template as Template)} 
                    className="cursor-pointer text-center bg-gray-400 rounded-md px-2 py-2 mb-2 ring-1 shadow-sm ring-gray-700 text-gray-800 transition-colors duration-500 hover:bg-gray-300"
                >
                    {template}
                </div>
            ))}
        </div>
    )
}