'use client'

import dynamic from 'next/dynamic'
import { RefObject, useRef, useState } from 'react'
import { HexColorInput, HexColorPicker } from 'react-colorful'
import { ColourElements, ColourElementType } from '@/types/template'
import useClickOutside from '@/hooks/useClickOutside'

const iconElementMap = {
  [ColourElements.text]: dynamic(() => import('react-icons/md').then(mod => mod.MdFormatColorText)),
  [ColourElements.background]: dynamic(() => import('react-icons/fa').then(mod => mod.FaFillDrip)),
}

export default function ColourPicker({
  elementType,
  colour,
  colourElementRef,
  onChange,
  onSave,
}: {
  elementType: ColourElementType
  colour?: string
  colourElementRef: RefObject<HTMLDivElement>
  onChange: (colour: string) => void
  onSave: (elementType: ColourElementType, colour: string) => Promise<void>
}) {
  const [showPicker, setShowPicker] = useState(false)
  const pickerRef = useRef(null)

  const setElementStyle = (newColour: string) => {
    const property = elementType === ColourElements.background ? 'backgroundColor' : 'color'
    if (colourElementRef.current) colourElementRef.current.style[property] = newColour
  }

  const onColourSelect = (newColour: string) => {
    setElementStyle(newColour)
    onChange(newColour)
  }

  useClickOutside(pickerRef, async () => {
    await onSave(elementType, colour ?? '')
    setShowPicker(false)
  })

  const Icon = iconElementMap[elementType]
  return (
    <>
      <button style={{ color: colour }} title={`Change ${elementType} colour`} onClick={() => setShowPicker(!showPicker)}>
        <Icon size="2.5em" />
      </button>
      {showPicker && (
        <div
          title="Colour Picker"
          ref={pickerRef}
          className={`absolute z-50 flex -translate-y-10 translate-x-9 flex-col items-center rounded-lg bg-black/50 p-3 shadow-md ring-1 ring-slate-300/60 backdrop-blur-sm dark:ring-slate-400/20`}
        >
          <HexColorPicker color={colour} onChange={onColourSelect} />
          <div className="mt-2 [&>input]:rounded-md [&>input]:border [&>input]:border-gray-200 [&>input]:bg-white [&>input]:text-gray-700 [&>input]:shadow-sm [&>input]:focus-within:border-gray-400 [&>input]:focus-within:ring-1 [&>input]:focus-within:ring-gray-400 [&>input]:dark:border-slate-600 [&>input]:dark:bg-slate-700 [&>input]:dark:text-white">
            <HexColorInput color={colour} onChange={onColourSelect} prefixed />
          </div>
        </div>
      )}
    </>
  )
}
