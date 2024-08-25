'use client'

import useResume from '@/hooks/useResume'
import { ColourElements, ColourElementType } from '@/types/template'
import { TemplateConfigContext } from '@/util/template'
import { RefObject, useContext, useState } from 'react'
import { FaUndo } from 'react-icons/fa'
import { ColourPicker } from '../../ui'

export default function ResumeColourPicker({ resumeId, colourElementRef }: { resumeId: string; colourElementRef: RefObject<HTMLDivElement> }) {
  const { selectedColours, defaultColours } = useContext(TemplateConfigContext)
  const { updateTemplateOptions } = useResume()
  const initialBGColour = selectedColours.background ?? defaultColours.background
  const initialTextColour = selectedColours.text ?? defaultColours.text
  const [backgroundColour, setBGColour] = useState(initialBGColour)
  const [textColour, setTextColour] = useState(initialTextColour)

  const getNewOptions = (elementType: ColourElementType, newColour: string) => ({
    colours: { ...selectedColours, [elementType]: newColour },
  })

  const onSave = async (elementType: ColourElementType, newColour: string) => {
    if (newColour === (elementType === ColourElements.background ? initialBGColour : initialTextColour)) return
    await updateTemplateOptions(resumeId, getNewOptions(elementType, newColour))
  }

  const onResetToDefault = async () => {
    if (backgroundColour === defaultColours.background && textColour === defaultColours.text) return
    await updateTemplateOptions(resumeId, { colours: {} })
    setBGColour(defaultColours.background)
    setTextColour(defaultColours.text)
  }

  return (
    <div className={`absolute right-3 top-10 z-50 text-[6.5pt] print:hidden`}>
      <div className="mb-2">
        <ColourPicker
          elementType={ColourElements.background}
          colour={backgroundColour}
          colourElementRef={colourElementRef}
          onChange={setBGColour}
          onSave={onSave}
        />
      </div>
      <div className="mb-10">
        <ColourPicker
          elementType={ColourElements.text}
          colour={textColour}
          colourElementRef={colourElementRef}
          onChange={setTextColour}
          onSave={onSave}
        />
      </div>
      <div className="mb-2">
        <button className="text-red-900" title="Reset to default colours" onClick={onResetToDefault}>
          <FaUndo size="2.3em" />
        </button>
      </div>
    </div>
  )
}
