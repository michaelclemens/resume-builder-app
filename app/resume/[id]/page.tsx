
import { ResumePreview } from "@/components";
import { getResumeFull } from "@/lib/client/resume";

export default async({ params: { id }}: { params: { id: string }}) => {
    const resume = await getResumeFull(id);
    return <ResumePreview resume={resume} />
}