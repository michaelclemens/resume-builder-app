import Loading from "@/app/loading";
import { Suspense } from "react";
import ListSkills from "./ListSkills";
import FormSkill from "./FormSkill";

export default function SkillSection({ resumeId }: { resumeId: string }) {
    return (
        <>
            <Suspense fallback={<Loading/>}>
                <ListSkills resumeId={resumeId}/>
            </Suspense>
            <Suspense fallback={<Loading/>}>
                <FormSkill resumeId={resumeId}/>
            </Suspense>
        </>
    )
}