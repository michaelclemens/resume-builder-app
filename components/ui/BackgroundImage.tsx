'use client'

import Image from 'next/image'
import backgroundLight from '@/public/backgrounds/light.jpg'
import backgroundDark from '@/public/backgrounds/dark.jpg'

export default function BackgroundImage() {
  const common = { quality: 100, priority: true, fill: true, sizes: '100vw' }
  return (
    <div className="fixed left-0 top-0 h-screen w-screen">
      <Image className="visible z-0 brightness-75 dark:invisible" src={backgroundLight} {...common} style={{ objectFit: 'cover' }} alt="Background Light" />
      <Image className="invisible z-0 brightness-50 dark:visible" src={backgroundDark} {...common} style={{ objectFit: 'cover' }} alt="Background Dark" />
    </div>
  )
}
