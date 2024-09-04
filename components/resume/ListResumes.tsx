'use client'

import { Resume } from '@prisma/client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { deleteResume } from '@/lib/client/resume'
import { sortByLatestCreated } from '@/util/sort'
import { ListButton } from '../ui/list'

const displayResumeScreenshots = process.env.GENERATE_RESUME_SCREENSHOTS === 'true'

export default function ListResumes({ resumes }: { resumes: Resume[] | null }) {
  const { push } = useRouter()
  if (!resumes || !resumes.length) return

  return (
    <div className="mx-auto flex w-1/2 justify-center">
      <div className="flex min-w-52 max-w-full rounded-lg px-5 py-2 text-white shadow-md ring-1 ring-slate-300/60 backdrop-blur-sm dark:ring-slate-400/20">
        <div className="flex snap-x gap-6 overflow-x-auto overflow-y-hidden px-1 pb-2 scrollbar scrollbar-track-transparent scrollbar-thumb-slate-300/70 dark:scrollbar-thumb-slate-900/70">
          {resumes.sort(sortByLatestCreated).map(resume => (
            <div key={resume.id} className="snap-start scroll-ml-6">
              <div className="mb-2 mt-1 text-center font-semibold">{resume.title}</div>
              <div onClick={() => push(`/resume/${resume.id}`)} className="relative h-56 w-40 cursor-pointer">
                <Image
                  className="brightness-75 transition-all duration-500 hover:brightness-100"
                  src={displayResumeScreenshots ? `/previews/${resume.id}/preview.jpg` : `/templates/${resume.template.toLowerCase()}.jpg`}
                  alt={'Edit Resume'}
                  unoptimized
                  fill={true}
                />
              </div>
              <div className="mt-3">
                <ListButton className="flex w-full justify-center" type="delete" onClick={async () => deleteResume(resume.id)} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
