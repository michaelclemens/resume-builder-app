import Link from 'next/link'
import { Alexandria } from 'next/font/google'
import { RxResume } from 'react-icons/rx'

const alexandria = Alexandria({ subsets: ['latin'], display: 'swap' })

export default function HomeButton() {
  return (
    <Link href="/" title="Home">
      <div className={`${alexandria.className} flex flex-row items-center py-2`}>
        <RxResume className="text-green-700 dark:text-indigo-500" size="2.5rem" />
        <span className="mx-2 h-10 w-1 rounded-md bg-green-700 dark:bg-indigo-500"></span>
        <span className="bg-gradient-to-r from-green-700 via-teal-500 via-30% to-sky-400 bg-clip-text text-[2.5rem] font-semibold text-transparent dark:from-indigo-500 dark:via-purple-500 dark:via-30% dark:to-pink-500">
          Resume Builder
        </span>
      </div>
    </Link>
  )
}
