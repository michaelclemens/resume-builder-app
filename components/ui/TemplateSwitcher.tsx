import useResume from '@/hooks/useResume'
import { getTemplateImage } from '@/util/template'
import { Template } from '@prisma/client'
import Image from 'next/image'

export const selectedClassName = 'brightness-100'
export const unselectedClassName = 'brightness-75'

export default function TemplateSwitcher({ resumeId, template: currentTemplate }: { resumeId: string; template?: Template }) {
  const { updateTemplate } = useResume()
  const isSelectedTemplate = (template: Template) => template === currentTemplate

  const onSelect = async (template: Template) => {
    if (isSelectedTemplate(template)) return
    updateTemplate(resumeId, template)
  }

  return (
    <div className="mt-10 flex flex-col items-center">
      {Object.values(Template).map(template => (
        <div
          key={template}
          onClick={async () => onSelect(template)}
          className={`mb-3 w-40 rounded-lg p-3 shadow-md ring-1 ring-slate-300/60 backdrop-blur-sm dark:ring-slate-400/20 ${isSelectedTemplate(template) ? 'select-none' : 'cursor-pointer'}`}
        >
          <Image
            className={`transition-all duration-500 ${isSelectedTemplate(template) ? selectedClassName : unselectedClassName} hover:brightness-100`}
            src={getTemplateImage(template)}
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
