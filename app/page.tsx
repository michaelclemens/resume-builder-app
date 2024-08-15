import { createResumeAction, getAllResumes } from "@/lib/client/resume";
import ListResumes from "@/components/resume/ListResumes";

export default async function Home() {
  const resumes = await getAllResumes();
  return (
    <main role="main" className="w-full h-full p-5 dark:text-white z-10">
      <div className="flex mx-auto w-1/2 min-h-80">
        <ListResumes resumes={resumes} />
      </div>
      <div className="flex flex-col w-full lg:w-1/3 mx-auto">
        <div className="my-3 mx-1 p-3 rounded-lg backdrop-blur-sm shadow-md ring-1 ring-slate-300/60 dark:ring-slate-400/20 dark:text-black">
          <form role="form" action={createResumeAction}>
            <button 
                type="submit" 
                className="w-full px-2 py-5 rounded-md transition-all duration-500 ring-1 ring-slate-300/60 dark:ring-slate-400/20 text-4xl font-extrabold bg-slate-300/70 dark:bg-slate-900/70 hover:bg-slate-300 hover:dark:bg-slate-900"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mr-2">
                Start A New Resume 
              </span>
              🚀
            </button>
          </form>
        </div>
      </div>  
    </main>
  )
}