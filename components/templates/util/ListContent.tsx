import { ListItemType } from '@/types/section'
import { sortByOrder } from '@/util/sort'
import { Heading, HeadingType, TemplateConfigContext } from '@/util/template'
import { createElement, ReactNode, useContext } from 'react'

export default function ListContent<ItemType extends ListItemType>({
  items,
  children,
  heading,
  headingType = Heading.h2,
  className,
}: {
  items: ItemType[]
  children: ReactNode | ((item: ItemType) => ReactNode)
  heading?: string
  headingType?: HeadingType
  className?: string
}) {
  const { headingClassName } = useContext(TemplateConfigContext)
  if (!items.length) return
  return (
    <section className={className}>
      {heading && createElement(headingType, { className: headingClassName[headingType] }, heading)}
      <div>{items.sort(sortByOrder).map(item => (typeof children === 'function' ? children(item) : children))}</div>
    </section>
  )
}