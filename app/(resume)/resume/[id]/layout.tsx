import { getResume } from '@/lib/client/resume'
import ResumeTitle from '@/components/resume/ResumeTitle'
import { Tabs } from '@/components/ui'

const tabs = ['personal', 'employments', 'educations', 'skills', 'strengths']

export default async function ResumeSectionLayout(props: { params: Promise<{ id: string }>; children: React.ReactNode; sections: React.ReactNode }) {
  const params = await props.params

  const { id } = params

  const { children, sections } = props

  const resume = await getResume(id)
  return (
    <>
      <ResumeTitle resume={resume} />
      <div className="z-10 flex w-full flex-grow flex-row overflow-hidden">
        <div className="relative w-2/3 flex-shrink flex-grow-0">
          <div className="flex h-full flex-col p-3">
            <Tabs tabs={tabs.map(name => ({ name, href: `/resume/${id}/${name !== 'personal' ? name : ''}` }))} />
            <div className="scrollbar scrollbar-track-transparent scrollbar-thumb-slate-300/70 dark:scrollbar-thumb-slate-900/70 relative -mr-1 flex h-full flex-col overflow-y-auto pr-2">
              {sections}
            </div>
          </div>
        </div>
        <main
          role="main"
          className="scrollbar scrollbar-track-transparent scrollbar-thumb-slate-300/70 dark:scrollbar-thumb-slate-900/70 relative flex h-full w-full flex-grow flex-col overflow-y-auto"
        >
          {children}
        </main>
      </div>
    </>
  )
}
