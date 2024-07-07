import Loading from "@/app/loading";
import { Suspense } from "react";
import ListEducations from "./ListEducations";
import FormEducation from "./FormEducation";

export default function EducationSection({ resumeId }: { resumeId: string }) {
    return (
        <>
            <Suspense fallback={<Loading/>}>
                <ListEducations resumeId={resumeId}/>
            </Suspense>
            <Suspense fallback={<Loading/>}>
                <FormEducation resumeId={resumeId}/>
            </Suspense>
        </>
    )
}