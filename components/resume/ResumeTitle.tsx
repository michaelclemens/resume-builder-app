import { Resume } from '@prisma/client'
import { editResumeTitleAction } from '@/lib/client/resume'
import ResumeTitleForm from './ResumeTitleForm'

export default function ResumeTitle({ resume }: { resume: Resume }) {
  const editAction = editResumeTitleAction.bind(null, resume.id)
  return (
    <div className="absolute top-0 left-1/2 z-40 mt-4 w-96 rounded-lg bg-slate-300/70 text-slate-800 ring-1 shadow-md ring-slate-700/30 dark:bg-slate-900/70 dark:text-slate-300 dark:ring-slate-400/20">
      <form role="form" action={editAction}>
        <ResumeTitleForm title={resume.title} />
      </form>
    </div>
  )
}
