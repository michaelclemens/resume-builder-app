import { SingleItemType } from '@/types/section'
import { Heading, HeadingType, TemplateConfigContext } from '@/util/template'
import { createElement, ReactNode, useContext } from 'react'

export default function ItemContent<ItemType extends SingleItemType | null>({
  item,
  children,
  heading,
  headingType = Heading.h2,
  className,
}: {
  item: ItemType
  children: ReactNode | ((item: ItemType) => ReactNode)
  heading?: string
  headingType?: HeadingType
  className?: string
}) {
  const { headingClassName } = useContext(TemplateConfigContext)
  if (!item) return
  const Element = headingType
  return (
    <section className={className}>
      {heading && <Element className={headingClassName[headingType]}>{heading}</Element>}
      {typeof children === 'function' ? children(item) : children}
    </section>
  )
}
