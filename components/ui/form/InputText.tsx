import { ForwardedRef, forwardRef } from 'react'
import { ChangeHandler, FieldError } from 'react-hook-form'
import { getInputDate } from '@/util/date'
import ErrorMessage from './ErrorMessage'
import styles from './InputText.module.css'

export enum InputTypeEnum {
  text = 'text',
  email = 'email',
  phone = 'phone',
  month = 'month',
}

type InputTypes = keyof typeof InputTypeEnum

export default forwardRef(function InputText(
  {
    label,
    type = InputTypeEnum.text,
    required = false,
    disabled = false,
    error,
    name,
    onChange,
    onBlur,
  }: {
    label: string
    type?: InputTypes
    required?: boolean
    disabled?: boolean
    error?: FieldError
    name: string
    onChange: ChangeHandler
    onBlur: ChangeHandler
  },
  inputRef: ForwardedRef<HTMLInputElement>
) {
  return (
    <div>
      <label
        className="relative mb-3 block overflow-hidden rounded-md border border-gray-200 bg-white px-3 pt-3 text-gray-700 shadow-sm focus-within:border-gray-400 focus-within:ring-1 focus-within:ring-gray-400 aria-disabled:opacity-50 dark:border-slate-600 dark:bg-slate-700"
        aria-disabled={disabled}
      >
        <input
          type={type}
          name={name}
          ref={inputRef}
          aria-label={name}
          aria-required={required}
          className={`${styles.input} peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 disabled:select-none disabled:opacity-50 dark:bg-slate-700 dark:text-white sm:text-sm`}
          placeholder={label}
          disabled={disabled}
          onChange={onChange}
          onBlur={onBlur}
          max={type === InputTypeEnum.month ? getInputDate(new Date()) : undefined}
        />

        <span className="absolute start-3 top-3 -translate-y-1/2 text-xs text-gray-700 transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs dark:text-white">
          {label}
          {required && (
            <span title="Required" className="ml-1 text-red-600">
              *
            </span>
          )}
        </span>
      </label>
      <ErrorMessage error={error} />
    </div>
  )
})
