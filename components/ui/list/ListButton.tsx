import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import { AvailableButtonTypes, ButtonType } from '@/types/list'

export const labelYPaddingClass = 'py-1'
export const iconYPaddingClass = 'py-2'

export default function ListButton({
  label = '',
  type,
  className = '',
  onClick,
}: {
  label?: string | JSX.Element
  type?: AvailableButtonTypes
  className?: string
  onClick?: () => void
}) {
  let button = null
  let iconClassNames = ''
  switch (type) {
    case ButtonType.edit:
      button = <FaEdit title="Edit" />
      iconClassNames = 'hover:text-blue-600 dark:hover:text-blue-400'
      break
    case ButtonType.delete:
      button = <FaTrashAlt title="Delete" />
      iconClassNames = 'hover:text-red-600 dark:hover:text-red-400'
      break
    default:
      button = label
      break
  }

  const paddingY = typeof button === 'string' ? labelYPaddingClass : iconYPaddingClass
  return (
    <button
      onClick={onClick}
      className={`${className} ${iconClassNames} ${paddingY} rounded-md px-2 font-medium text-white shadow-sm ring-1 ring-slate-300/60 transition-colors duration-500 hover:bg-slate-200/70 dark:ring-slate-400/20 dark:hover:bg-slate-600/70`}
    >
      {button}
    </button>
  )
}
