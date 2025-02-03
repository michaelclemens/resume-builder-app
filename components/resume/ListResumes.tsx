'use client'

import { Resume } from '@prisma/client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { cloneResume, deleteResume } from '@/lib/client/resume'
import { sortByLatestCreated } from '@/util/sort'
import { Loading } from '../ui'
import { ListButton } from '../ui/list'

const displayResumeScreenshots = process.env.GENERATE_RESUME_SCREENSHOTS === 'true'

export default function ListResumes({ resumes }: { resumes: Resume[] | null }) {
  const { push } = useRouter()
  const [loading, setLoading] = useState(false)

  if (!resumes || !resumes.length) return

  const onDelete = async (id: string) => {
    setLoading(true)
    try {
      await deleteResume(id)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const onClone = async (id: string) => {
    setLoading(true)
    try {
      await cloneResume(id)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto flex w-1/2 justify-center">
      <div className="relative flex max-w-full min-w-52 rounded-lg px-5 py-2 text-white ring-1 shadow-md ring-slate-300/60 backdrop-blur-sm dark:ring-slate-400/20">
        <div className="scrollbar scrollbar-track-transparent scrollbar-thumb-slate-300/70 dark:scrollbar-thumb-slate-900/70 flex snap-x gap-6 overflow-x-auto overflow-y-hidden px-1 pb-2">
          {resumes.sort(sortByLatestCreated).map(resume => (
            <div key={resume.id} className="snap-start scroll-ml-6">
              <div className="mt-1 mb-2 text-center font-semibold">{resume.title}</div>
              <div onClick={() => push(`/resume/${resume.id}`)} className="relative h-56 w-40 cursor-pointer">
                <Image
                  className="brightness-75 transition-all duration-500 hover:brightness-100"
                  src={displayResumeScreenshots ? `/previews/${resume.id}/preview.jpg` : `/templates/${resume.template.toLowerCase()}.jpg`}
                  alt={'Edit Resume'}
                  unoptimized
                  fill={true}
                />
              </div>
              <div className="mt-3 flex gap-3">
                <ListButton className="w-full" type="clone" disabled={loading} onClick={async () => onClone(resume.id)} />
                <ListButton className="w-full" type="delete" disabled={loading} onClick={async () => onDelete(resume.id)} />
              </div>
            </div>
          ))}
        </div>
        {loading && <Loading />}
      </div>
    </div>
  )
}
