'use client'

import backgroundDark from '@/public/backgrounds/dark.jpg'
import backgroundLight from '@/public/backgrounds/light.jpg'
import Image from 'next/image'

export default function BackgroundImage() {
  const common = { quality: 100, priority: true, fill: true, sizes: '100vw' }
  return (
    <div className="fixed top-0 left-0 -z-10 h-screen w-screen">
      <Image
        className="visible brightness-75 select-none dark:invisible"
        src={backgroundLight}
        {...common}
        style={{ objectFit: 'cover' }}
        alt="Background Light"
      />
      <Image className="invisible brightness-50 dark:visible" src={backgroundDark} {...common} style={{ objectFit: 'cover' }} alt="Background Dark" />
    </div>
  )
}
