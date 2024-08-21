import { createResumeAction, getAllResumes } from '@/lib/client/resume'
import ListResumes from '@/components/resume/ListResumes'

export default async function Home() {
  const resumes = await getAllResumes()
  return (
    <main role='main' className='z-10 h-full w-full p-5 dark:text-white'>
      <div className='mx-auto flex min-h-80 w-1/2'>
        <ListResumes resumes={resumes} />
      </div>
      <div className='mx-auto flex w-full flex-col lg:w-1/3'>
        <div className='mx-1 my-3 rounded-lg p-3 shadow-md ring-1 ring-slate-300/60 backdrop-blur-sm dark:text-black dark:ring-slate-400/20'>
          <form role='form' action={createResumeAction}>
            <button
              type='submit'
              className='w-full rounded-md bg-slate-300/70 px-2 py-5 text-4xl font-extrabold ring-1 ring-slate-300/60 transition-all duration-500 hover:bg-slate-300 dark:bg-slate-900/70 dark:ring-slate-400/20 hover:dark:bg-slate-900'
            >
              <span className='mr-2 bg-gradient-to-r from-green-700 via-cyan-600 to-sky-600 bg-clip-text text-transparent dark:from-indigo-500 dark:via-purple-500 dark:to-pink-500'>
                Start A New Resume
              </span>
              🔥🚀
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
