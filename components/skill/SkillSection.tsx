"use client"

import ListSkills from "./ListSkills";
import FormSkill from "./FormSkill";
import Loading from "@/app/loading";
import { useSkill } from "@/hooks/";
import { useEffect } from "react";
import { ExpandableWrapper } from "@/components/util";

export default function SkillSection({ resumeId }: { resumeId: string }) {
    const { skills, loading, fetch, reset } = useSkill();
    
    useEffect(() => {
        fetch(resumeId)
        return () => reset()
    }, [resumeId]);
    
    return (
        <div>
            <h1 className="text-xl pb-1 border-b font-semibold mb-1">Skills</h1>
            <ExpandableWrapper open={!loading} initialMaxHeight="max-h-24">
                {loading ? <Loading /> : (
                    <>
                        <ListSkills skills={skills} />
                        <FormSkill resumeId={resumeId} />
                    </>
                )}
            </ExpandableWrapper>
        </div>
    )
}