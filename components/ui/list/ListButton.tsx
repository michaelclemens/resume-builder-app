import { FaClone, FaEdit, FaTrashAlt } from 'react-icons/fa'
import { AvailableButtonTypes, ButtonType } from '@/types/list'

export const labelYPaddingClass = 'py-1'
export const iconYPaddingClass = 'py-2'

export default function ListButton({
  label = '',
  type,
  className = '',
  disabled = false,
  onClick,
}: {
  label?: string | JSX.Element
  type?: AvailableButtonTypes
  className?: string
  disabled?: boolean
  onClick?: () => void | Promise<void>
}) {
  let children = null
  let iconClassNames = ''
  switch (type) {
    case ButtonType.edit:
      children = <FaEdit title="Edit" />
      iconClassNames = 'hover:text-blue-600 dark:hover:text-blue-400'
      break
    case ButtonType.delete:
      children = <FaTrashAlt title="Delete" />
      iconClassNames = 'hover:text-red-600 dark:hover:text-red-400'
      break
    case ButtonType.clone:
      children = <FaClone title="Clone" />
      iconClassNames = 'hover:text-yellow-600 dark:hover:text-yellow-400'
      break
    default:
      children = label
      break
  }

  const paddingY = typeof children === 'string' ? labelYPaddingClass : iconYPaddingClass
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${className} ${iconClassNames} ${paddingY} flex justify-center rounded-md px-2 font-medium text-white shadow-sm ring-1 ring-slate-300/60 transition-colors duration-500 hover:bg-slate-200/70 disabled:select-none disabled:opacity-50 dark:ring-slate-400/20 dark:hover:bg-slate-600/70`}
    >
      {children}
    </button>
  )
}
