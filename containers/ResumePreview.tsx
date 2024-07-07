import { getFullResume } from "@/lib/client/resume";

export default async function ResumePreview({ id }: { id: string }) {
    const resume = await getFullResume(id);

    return (
        <div>
            {JSON.stringify(resume)}
        </div> 
    )
}