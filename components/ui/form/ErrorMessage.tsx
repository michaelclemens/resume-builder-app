import { FieldError } from 'react-hook-form'

export default function ErrorMessage({ error }: { error?: FieldError }) {
  return (
    error && (
      <p role='alert' className='-mt-1 mb-1 ml-1 text-xs font-semibold italic text-red-500'>
        {error.message}
      </p>
    )
  )
}
