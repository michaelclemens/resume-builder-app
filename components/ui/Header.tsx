import HomeButton from "./HomeButton";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
    return (
        <header className="w-full px-6 py-4 bg-white border-b divide-slate-400/20 flex items-center justify-between dark:bg-slate-950 dark:border-slate-600 dark:divide-white">
            <HomeButton />
            <ThemeToggle />
        </header>
    )
}