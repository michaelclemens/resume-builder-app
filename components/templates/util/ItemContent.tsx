import { ReactNode } from 'react'
import { SingleItemType } from '@/types/section'
import Heading, { TemplateHeadingType } from './Heading'

export default function ItemContent<ItemType extends SingleItemType | null>({
  item,
  children,
  heading,
  headingType,
  className,
}: {
  item: ItemType
  children: ReactNode | ((item: ItemType) => ReactNode)
  heading?: string
  headingType?: TemplateHeadingType
  className?: string
}) {
  if (!item) return
  return (
    <section className={className}>
      {heading && <Heading heading={heading} headingType={headingType} />}
      {typeof children === 'function' ? children(item) : children}
    </section>
  )
}
