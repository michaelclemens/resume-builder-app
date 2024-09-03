'use client'

import CtaButton from '@/components/ui/CtaButton'
import { useEffect } from 'react'

export default function Error(error: unknown, reset: () => void) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="mx-auto mt-10 w-3/4 text-center">
      <h2 className="mb-5 text-4xl font-semibold text-red-500">Something went wrong!</h2>
      <CtaButton onClick={() => reset()}>Reload tab</CtaButton>
    </div>
  )
}
