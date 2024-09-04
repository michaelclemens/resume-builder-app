'use client'

import { useFormStatus } from 'react-dom'
import { FaSpinner } from 'react-icons/fa'
import CtaButton from '../ui/CtaButton'

export default function CreateResumeForm() {
  const { pending } = useFormStatus()
  return (
    <CtaButton disabled={pending}>
      Create A New Resume
      {pending && <FaSpinner title="Loading..." className="ml-3 animate-spin text-sky-600 dark:text-pink-500" size="2rem" />}
    </CtaButton>
  )
}
