import Loading from "@/app/loading";
import { Suspense } from "react";
import ListStrengths from "./ListStrengths";
import FormStrength from "./FormStrength";

export default function StrengthSection({ resumeId }: { resumeId: string }) {
    return (
        <>
            <Suspense fallback={<Loading/>}>
                <ListStrengths resumeId={resumeId}/>
            </Suspense>
            <Suspense fallback={<Loading/>}>
                <FormStrength resumeId={resumeId}/>
            </Suspense>
        </>
    )
}