"use client"

import Image from "next/image";
import backgroundLight from "@/public/backgrounds/light.jpg";
import backgroundDark from "@/public/backgrounds/dark.jpg";

export default function BackgroundImage() {
    const common = { quality: 100, priority: true, fill: true, sizes: '100vw' };
    return (
        <div className="fixed top-0 left-0 w-screen h-screen">
            <Image className="visible dark:invisible z-0 brightness-75" src={backgroundLight} {...common} style={{ objectFit: 'cover' }} alt="" />
            <Image className="invisible dark:visible z-0 brightness-50" src={backgroundDark} {...common} style={{ objectFit: 'cover' }}  alt="" />
        </div>
    )
}