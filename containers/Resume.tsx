import Loading from "@/app/loading";
import FormEducation from "@/components/education/FormEducation";
import ListEducations from "@/components/education/ListEducations";
import { getResume } from "@/lib/actions";
import { Suspense } from "react";

export default async function Resume({ id }: { id: string }) {
    const resume = await getResume(id);

    return (
        <div>
            {JSON.stringify(resume)}
            <Suspense fallback={<Loading/>}>
                <ListEducations resumeId={resume.id}/>
            </Suspense>
            <Suspense fallback={<Loading/>}>
                <FormEducation resumeId={resume.id}/>
            </Suspense>
        </div> 
    )
}