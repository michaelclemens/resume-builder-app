import { Suspense } from "react";
import { createResumeAction } from "../lib/actions";
import Loading from "@/app/loading";
import ResumeList from "@/components/ResumeList";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Suspense fallback={<Loading/>}>
        <ResumeList/>
      </Suspense>
      <form action={createResumeAction}>
        <button type="submit">Create</button>
      </form>
    </main>
  )
}