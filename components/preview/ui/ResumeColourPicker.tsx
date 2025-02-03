'use client'

import { RefObject, useContext } from 'react'
import { FaUndo } from 'react-icons/fa'
import { ColourElements, ColourElementType } from '@/types/template'
import useResume from '@/hooks/useResume'
import { TemplateConfigContext } from '@/util/template'
import { ColourPicker } from '../../ui'

export default function ResumeColourPicker({ resumeId, colourElementRef }: { resumeId: string; colourElementRef: RefObject<HTMLDivElement> }) {
  const { selectedColours, defaultColours } = useContext(TemplateConfigContext)
  const { updateTemplateOptions } = useResume()
  const backgroundColour = selectedColours?.background ?? defaultColours.background
  const textColour = selectedColours?.text ?? defaultColours.text

  const getNewOptions = (elementType: ColourElementType, newColour: string) => ({
    colours: { ...selectedColours, [elementType]: newColour },
  })

  const onSave = async (elementType: ColourElementType, newColour: string) => {
    if (newColour === (elementType === ColourElements.background ? backgroundColour : textColour)) return
    await updateTemplateOptions(resumeId, getNewOptions(elementType, newColour))
  }

  const onResetToDefault = async () => {
    if (!selectedColours) return
    await updateTemplateOptions(resumeId, { colours: {} })
  }

  return (
    <div className={`absolute top-10 right-3 z-50 text-[6.5pt] print:hidden`}>
      <div className="mb-2">
        <ColourPicker elementType={ColourElements.background} colour={backgroundColour} colourElementRef={colourElementRef} onSave={onSave} />
      </div>
      <div className="mb-10">
        <ColourPicker elementType={ColourElements.text} colour={textColour} colourElementRef={colourElementRef} onSave={onSave} />
      </div>
      <div className="mb-2">
        <button className="text-red-900" title="Reset to default colours" onClick={onResetToDefault}>
          <FaUndo size="2.3em" />
        </button>
      </div>
    </div>
  )
}
