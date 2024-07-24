import ResumePreview from "@/containers/ResumePreview";
import { getResumeFull } from "@/lib/client/resume";

export default async({ params: { id }}: { params: { id: string }}) => {
    const resume = await getResumeFull(id);
    return <ResumePreview resume={resume} />
}