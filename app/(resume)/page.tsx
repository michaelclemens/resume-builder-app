import { createResumeAction, getAllResumes } from '@/lib/client/resume'
import ListResumes from '@/components/resume/ListResumes'
import CtaButton from '@/components/ui/CtaButton'

export default async function Home() {
  const resumes = await getAllResumes()
  return (
    <main role="main" className="z-10 h-full w-full p-5 dark:text-white">
      <div className="mx-auto flex min-h-80 w-1/2">
        <ListResumes resumes={resumes} />
      </div>
      <div className="mx-auto flex w-full flex-col lg:w-1/3">
        <form role="form" action={createResumeAction}>
          <CtaButton>Create A New Resume</CtaButton>
        </form>
      </div>
    </main>
  )
}
