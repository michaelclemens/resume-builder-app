import { ListItemType } from '@/types/section'
import { sortByOrder } from '@/util/sort'
import { ReactNode } from 'react'
import Heading, { TemplateHeadingType } from './Heading'
import { useAutoAnimate } from '@formkit/auto-animate/react'

export default function ListContent<ItemType extends ListItemType>({
  items,
  children,
  heading,
  headingType,
  className,
}: {
  items: ItemType[]
  children: ReactNode | ((item: ItemType) => ReactNode)
  heading?: string
  headingType?: TemplateHeadingType
  className?: string
}) {
  const [animationParent] = useAutoAnimate()
  if (!items.length) return
  return (
    <div className={className}>
      {heading && <Heading heading={heading} headingType={headingType} />}
      <div ref={animationParent}>{items.sort(sortByOrder).map(item => (typeof children === 'function' ? children(item) : children))}</div>
    </div>
  )
}
