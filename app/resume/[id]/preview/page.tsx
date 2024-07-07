import Loading from "@/app/loading";
import ResumePreview from "@/containers/ResumePreview";
import { Suspense } from "react";

export default ({ params: {id}}: { params: { id: string }}) => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Suspense fallback={<Loading/>}>
                <ResumePreview id={id} />
            </Suspense>
        </main>
    )
}