import Loading from "@/app/loading";
import ResumePreview from "@/components/resume/ResumePreview";
import { Suspense } from "react";

export default ({ params: { id }}: { params: { id: string }}) => {
    return (
        <main>
            <Suspense fallback={<Loading/>}>
                <ResumePreview id={id} />
            </Suspense>
        </main>
    )
}