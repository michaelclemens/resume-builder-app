import { Tabs } from "@/components/tab";
import { getResume } from "@/lib/client/resume";
import { notFound } from "next/navigation";

const tabs = ['personal', 'employments', 'educations', 'skills', 'strengths'];
 
export default async function Layout({ params: { id }, children, sections }: { params: { id: string }, children: React.ReactNode, sections: React.ReactNode }) {
  const resume = await getResume(id);
  if (!resume) notFound()

  return (
    <div className="w-full flex flex-row flex-grow overflow-hidden z-10">
      <div className="w-2/3 flex-shrink flex-grow-0">
          <div className="flex flex-col h-full p-3">
            <Tabs tabs={tabs.map(name => ({ name, href: `/resume/${id}/${name}`}))}/>
            <div className="relative flex flex-col h-full overflow-y-auto">{sections}</div>
          </div>
      </div>
      <main role="main" className="relative w-full h-full flex flex-grow flex-col overflow-y-auto">
        {children}
      </main>
    </div>
  )
}