import { TemplateConfigContext } from '@/util/template'
import { ReactNode, Ref, useContext } from 'react'

export default function ColourElement({
  children,
  colourElementRef,
  className,
}: {
  children: ReactNode
  colourElementRef?: Ref<HTMLDivElement>
  className?: string
}) {
  const { selectedColours, defaultColours } = useContext(TemplateConfigContext)
  return (
    <div
      ref={colourElementRef}
      className={className}
      style={{
        backgroundColor: selectedColours.background ?? defaultColours.background,
        color: selectedColours.text ?? defaultColours.text,
      }}
    >
      {children}
    </div>
  )
}