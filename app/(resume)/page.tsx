import { createResumeAction, getAllResumes } from '@/lib/client/resume'
import CreateResumeForm from '@/components/resume/CreateResumeForm'
import ListResumes from '@/components/resume/ListResumes'

export default async function Home() {
  const resumes = await getAllResumes()
  return (
    <main role="main" className="z-10 h-full w-full pt-3 dark:text-white">
      <ListResumes resumes={resumes} />
      <div className="mx-auto flex w-full flex-col lg:w-1/3">
        <form role="form" action={createResumeAction}>
          <CreateResumeForm />
        </form>
      </div>
    </main>
  )
}
