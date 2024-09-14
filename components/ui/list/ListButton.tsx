import dynamic from 'next/dynamic'
import { AvailableButtonTypes, ButtonType } from '@/types/list'

export const labelYPaddingClass = 'py-1'
export const iconYPaddingClass = 'py-2'

const iconButtonMap = {
  [ButtonType.edit]: dynamic(() => import('react-icons/fa').then(mod => mod.FaEdit)),
  [ButtonType.delete]: dynamic(() => import('react-icons/fa').then(mod => mod.FaTrashAlt)),
  [ButtonType.clone]: dynamic(() => import('react-icons/fa').then(mod => mod.FaClone)),
}

const iconClassNameMap = {
  [ButtonType.edit]: 'hover:text-blue-600 dark:hover:text-blue-400',
  [ButtonType.delete]: 'hover:text-red-600 dark:hover:text-red-400',
  [ButtonType.clone]: 'hover:text-yellow-600 dark:hover:text-yellow-400',
}

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
  const Icon = type && iconButtonMap[type]
  const paddingY = Icon ? iconYPaddingClass : labelYPaddingClass
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${className} ${Icon && iconClassNameMap[type]} ${paddingY} flex justify-center rounded-md px-2 font-medium text-white shadow-sm ring-1 ring-slate-300/60 transition-colors duration-500 hover:bg-slate-200/70 disabled:select-none disabled:opacity-50 dark:ring-slate-400/20 dark:hover:bg-slate-600/70`}
    >
      {Icon ? <Icon title={type} /> : label}
    </button>
  )
}
