import useResume from "@/hooks/useResume"
import { Template } from "@prisma/client"
import Image from "next/image";

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
                    <Image 
                        src={`/templates/${template.toLowerCase()}.png`}
                        width={100}
                        height={100}
                        alt={`Template ${template.toLowerCase()}`}
                        priority={true}
                        style={{ width: '100%', height: 'auto' }}
                    />
                </div>
            ))}
        </div>
    )
}