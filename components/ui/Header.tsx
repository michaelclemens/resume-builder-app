import HomeButton from "./HomeButton";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
    return (
        <header className="w-full px-6 py-4 border-b border-b-slate-300/60 dark:border-b-slate-400/20 flex items-center justify-between z-10">
            <HomeButton />
            <ThemeToggle />
        </header>
    )
}