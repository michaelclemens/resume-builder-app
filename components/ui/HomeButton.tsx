import Link from "next/link";
import { FaHome } from "react-icons/fa";

export default function HomeButton() {
    return (
        <span className="text-sm text-gray-700 text-center transition-color duration-500 hover:text-gray-500 dark:text-slate-500 dark:hover:text-slate-400">
          <Link href="/"><FaHome size="2em"/></Link>
        </span>
    )
}