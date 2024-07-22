import { getResume } from "@/lib/client/resume";
import { notFound } from "next/navigation";
 
export default async function Layout(
  { params: { id }, children, personal, employment, education, skill, strength }: 
  { params: { id: string }, children: React.ReactNode, personal: React.ReactNode, employment: React.ReactNode, education: React.ReactNode, skill: React.ReactNode, strength: React.ReactNode }
) {
  const resume = await getResume(id);
  if (!resume) notFound()

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="w-full flex flex-row flex-grow overflow-hidden">
          <div className="w-3/4 flex-shrink flex-grow-0">
              <div className="flex flex-col overflow-y-auto h-full p-3">
                {personal}
                {employment}
                {education}
                {skill}
                {strength}
              </div>
          </div>
          <main role="main" className="w-full h-full flex-grow overflow-y-auto bg-gray-600">
            {children}
          </main>
      </div>
    </div>
  )
}