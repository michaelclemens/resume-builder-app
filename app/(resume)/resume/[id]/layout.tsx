import { Tabs } from '@/components/ui'
import { getResume } from '@/lib/client/resume'
import { notFound } from 'next/navigation'

const tabs = ['personal', 'employments', 'educations', 'skills', 'strengths']

export default async function ResumeSectionLayout({
  params: { id },
  children,
  sections,
}: {
  params: { id: string }
  children: React.ReactNode
  sections: React.ReactNode
}) {
  const resume = await getResume(id)
  if (!resume) notFound()

  return (
    <div className="z-10 flex w-full flex-grow flex-row overflow-hidden">
      <div className="w-2/3 flex-shrink flex-grow-0">
        <div className="flex h-full flex-col p-3">
          <Tabs tabs={tabs.map(name => ({ name, href: `/resume/${id}/${name}` }))} />
          <div className="relative -mr-1 flex h-full flex-col overflow-y-auto pr-2 scrollbar scrollbar-track-transparent scrollbar-thumb-slate-300/70 dark:scrollbar-thumb-slate-900/70">
            {sections}
          </div>
        </div>
      </div>
      <main
        role="main"
        className="relative flex h-full w-full flex-grow flex-col overflow-y-auto scrollbar scrollbar-track-transparent scrollbar-thumb-slate-300/70 dark:scrollbar-thumb-slate-900/70"
      >
        {children}
      </main>
    </div>
  )
}
