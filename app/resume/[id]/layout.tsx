import { getResume } from "@/lib/client/resume";
import { notFound } from "next/navigation";
import { Suspense } from "react";
 
export default async function Layout(
  { params: { id }, children, personal, employment, education, skill, strength }: 
  { params: { id: string }, children: React.ReactNode, personal: React.ReactNode, employment: React.ReactNode, education: React.ReactNode, skill: React.ReactNode, strength: React.ReactNode }
) {
  const resume = await getResume(id);
  if (!resume) notFound()

  return (
    <div className="w-full h-screen flex flex-row overflow-hidden">
      <div className="w-3/4">
          <div className="h-full p-3 flex flex-col overflow-y-auto">
            {personal}
            {employment}
            {education}
            {skill}
            {strength}
          </div>
      </div>
      <main role="main" className="w-full h-full overflow-y-auto bg-gray-600">
        {children}
      </main>
    </div>
  )
}