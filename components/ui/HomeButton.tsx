import Link from 'next/link'
import { FaHome } from 'react-icons/fa'

export default function HomeButton() {
  return (
    <span className="transition-color text-center text-sm text-slate-400 duration-500 hover:text-gray-500 dark:text-slate-500 dark:hover:text-slate-400">
      <Link href="/">
        <FaHome title="Home" size="2em" />
      </Link>
    </span>
  )
}
