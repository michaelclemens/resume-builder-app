import Loading from "@/app/loading";
import { Suspense } from "react";
import ListEmployments from "./ListEmployments";
import FormEmployment from "./FormEmployment";

export default function EmploymentSection({ resumeId }: { resumeId: string }) {
    return (
        <>
            <Suspense fallback={<Loading/>}>
                <ListEmployments resumeId={resumeId}/>
            </Suspense>
            <Suspense fallback={<Loading/>}>
                <FormEmployment resumeId={resumeId}/>
            </Suspense>
        </>
    )
}