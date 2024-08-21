import HomeButton from './HomeButton'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  return (
    <header className='z-10 flex w-full items-center justify-between border-b border-b-slate-300/60 px-6 py-4 dark:border-b-slate-400/20'>
      <HomeButton />
      <ThemeToggle />
    </header>
  )
}
