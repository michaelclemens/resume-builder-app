import { Suspense } from "react";
import Loading from "@/app/loading";
import ListResumes from "@/components/resume/ListResumes";
import { createResumeAction } from "@/lib/client/resume";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Suspense fallback={<Loading/>}>
        <ListResumes/>
      </Suspense>
      <form action={createResumeAction}>
        <button type="submit">Create</button>
      </form>
    </main>
  )
}