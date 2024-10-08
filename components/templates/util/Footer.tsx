import { Template } from '@prisma/client'
import { useContext } from 'react'
import { TemplateConfigContext } from '@/util/template'
import styles from './Footer.module.css'

type TemplateClassNamesType = {
  [key in Template]?: string
}

const templateClassNames: TemplateClassNamesType = {
  [Template.COMPACT]: 'text-right pr-2',
  [Template.SIMPLE]: 'top-0 text-right pr-2 pt-2',
}

export default function Footer() {
  const { template, selectedColours, defaultColours } = useContext(TemplateConfigContext)
  return (
    <div
      title="Resume Print Footer"
      className={`${styles.footer} pl-2 ${templateClassNames[template] ?? ''}`}
      style={{
        color: selectedColours?.text ?? defaultColours.text,
      }}
    />
  )
}
