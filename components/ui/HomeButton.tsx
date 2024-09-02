import Link from 'next/link'
import { FaHome } from 'react-icons/fa'

export default function HomeButton() {
  return (
    <span className="transition-color text-center text-sm text-sky-500/90 duration-500 hover:text-sky-400 dark:text-violet-700/90 dark:hover:text-violet-600">
      <Link href="/">
        <FaHome title="Home" size="2.25em" />
      </Link>
    </span>
  )
}
