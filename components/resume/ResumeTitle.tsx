import { Resume } from '@prisma/client'
import { editResumeTitleAction } from '@/lib/client/resume'
import ResumeTitleForm from './ResumeTitleForm'

export default function ResumeTitle({ resume }: { resume: Resume }) {
  const editAction = editResumeTitleAction.bind(null, resume.id)
  return (
    <div className="absolute left-1/3 top-0 z-40 mt-2 w-1/3 rounded-lg bg-slate-300/70 text-slate-800 shadow-md ring-1 ring-slate-700/30 dark:bg-slate-900/70 dark:text-slate-300 dark:ring-slate-400/20">
      <form role="form" action={editAction}>
        <ResumeTitleForm title={resume.title} />
      </form>
    </div>
  )
}
