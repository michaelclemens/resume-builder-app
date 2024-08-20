import ResumePreview from "@/components/preview/ResumePreview";
import { getResumeFull } from "@/lib/client/resume";

export default async function DefaultPage({ params: { id }}: { params: { id: string }}) {
    const resume = await getResumeFull(id);
    return <ResumePreview resume={resume} />
}