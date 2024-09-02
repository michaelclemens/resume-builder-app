import HomeButton from './HomeButton'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  return (
    <header className="z-10 flex w-full items-center justify-between border-b border-b-slate-300/60 px-6 dark:border-b-slate-400/20">
      <HomeButton />
      <div className="my-2 ml-10 p-2 text-5xl font-bold tracking-wide text-sky-500/90 dark:text-violet-700/90">Resume Builder</div>
      <ThemeToggle />
    </header>
  )
}
