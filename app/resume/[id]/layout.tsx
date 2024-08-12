import { Tabs } from "@/components/tab";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { getResume } from "@/lib/client/resume";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaHome } from "react-icons/fa";

const tabs = ['personal', 'employments', 'educations', 'skills', 'strengths'];
 
export default async function Layout({ params: { id }, children, sections }: { params: { id: string }, children: React.ReactNode, sections: React.ReactNode }) {
  const resume = await getResume(id);
  if (!resume) notFound()

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <header className="w-full px-6 py-4 bg-white border-b divide-slate-400/20 flex items-center justify-between dark:bg-slate-950 dark:border-slate-600 dark:divide-white">
        <span className="text-sm text-gray-700 text-center transition-color duration-500 hover:text-gray-500 dark:text-slate-500 dark:hover:text-slate-400">
          <Link href="/"><FaHome size="2em"/></Link>
        </span>
        <ThemeToggle />
      </header>
      <div className="w-full flex flex-row flex-grow overflow-hidden">
        <div className="w-2/3 flex-shrink flex-grow-0 dark:bg-slate-950">
            <div className="flex flex-col overflow-y-auto h-full p-3">
              <Tabs tabs={tabs.map(name => ({ name, href: `/resume/${id}/${name}`}))}/>
              <div>{sections}</div>
            </div>
        </div>
        <main role="main" className="w-full h-full flex flex-grow flex-col overflow-y-auto bg-slate-600">
          {children}
        </main>
      </div>
    </div>
  )
}