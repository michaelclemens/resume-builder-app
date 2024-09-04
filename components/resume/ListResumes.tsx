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
    <div className="mx-auto flex items-center gap-6 overflow-x-auto overflow-y-hidden rounded-lg p-5 text-white shadow-md ring-1 ring-slate-300/60 backdrop-blur-sm dark:ring-slate-400/20">
      {resumes.sort(sortByLatestCreated).map(resume => (
        <div key={resume.id} className="shrink-0">
          <div className="mb-2 text-center text-sm">{resume.createdAt.toLocaleString('en-GB')}</div>
          <div onClick={() => push(`/resume/${resume.id}`)} className="cursor-pointer">
            <Image
              className="h-[208px] w-[160px] brightness-75 transition-all duration-500 hover:brightness-100"
              src={displayResumeScreenshots ? `/previews/${resume.id}/preview.jpg` : `/templates/${resume.template.toLowerCase()}.jpg`}
              width={160}
              height={208}
              alt={'Edit Resume'}
              unoptimized
            />
          </div>

          <div className="mt-2 text-center">
            <ListButton type="delete" onClick={async () => deleteResume(resume.id)} />
          </div>
        </div>
      ))}
    </div>
  )
}
