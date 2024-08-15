import useResume from "@/hooks/useResume"
import { Template } from "@prisma/client"
import Image from "next/image";

export default function TemplateSwitcher({ resumeId }: { resumeId: string }) {
    const { resume, updateTemplate } = useResume();
    const isSelectedTemplate = (template: string) => template === resume?.template;

    const onSelect = async (template: string) => {
        if (isSelectedTemplate(template)) return;
        updateTemplate(resumeId, template as Template)
    }

    return (
        <div className="mt-10">
            {Object.keys(Template).map(template => (
                <div 
                    key={template} 
                    onClick={async () => onSelect(template)} 
                    className={`backdrop-blur-sm shadow-md rounded-lg p-3 mb-3 ring-1 ring-slate-300/60 dark:ring-slate-400/20 ${isSelectedTemplate(template) ? 'select-none' : 'cursor-pointer'}`}
                >
                    <Image 
                        className={`transition-all duration-500 ${isSelectedTemplate(template) ? 'brightness-100' : 'brightness-75'} hover:brightness-100`}
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