import Loading from "@/app/loading";
import AddEducation from "@/components/education/AddEducation";
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
            <AddEducation resumeId={resume.id}/>
        </div> 
    )
}