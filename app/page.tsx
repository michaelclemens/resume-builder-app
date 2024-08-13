import { createResumeAction, getAllResumes } from "@/lib/client/resume";
import ListResumes from "@/components/resume/ListResumes";
import { SubmitButton } from "@/components/form";

export default async function Home() {
  const resumes = await getAllResumes();
  return (
    <main role="main" className="flex w-full h-full p-10 justify-center items-center dark:bg-slate-950 dark:text-white">
      <div className="w-1/3 mx-auto">
        <ListResumes resumes={resumes} />
        <div className="my-3 mx-1 bg-slate-50 p-3 rounded-lg ring-1 ring-slate-700/10 dark:bg-slate-800 dark:text-black dark:ring-slate-700">
          <form role="form" action={createResumeAction} >
            <SubmitButton label="Create New Resume" />
          </form>
        </div>
      </div>  
    </main>
  )
}