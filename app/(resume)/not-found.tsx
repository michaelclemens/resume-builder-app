import { Metadata } from 'next'
import Link from 'next/link'
import CtaButton from '@/components/ui/CtaButton'

export const metadata: Metadata = {
  title: '404 - Not Found',
}

export default function NotFound() {
  return (
    <div className="mx-auto flex w-1/3 flex-col justify-center pt-20 text-center text-white">
      <h2 className="mb-5 text-5xl font-bold">Resume Not Found</h2>
      <p className="mb-5 text-xl">Could not find the requested resume</p>
      <CtaButton>
        <Link href="/">Return Home</Link>
      </CtaButton>
    </div>
  )
}
