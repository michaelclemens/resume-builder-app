"use client"

import ListSkills from "./ListSkills";
import FormSkill from "./FormSkill";
import Loading from "@/app/loading";
import useSkill from "@/hooks/useSkill";
import { Resume } from "@prisma/client";
import { useEffect } from "react";
import ExpandableWrapper from "../ExpandableWrapper";

export default function SkillSection({ resume }: { resume: Resume }) {
    const { skills, loading, fetch, reset } = useSkill();
    
    useEffect(() => {
        fetch(resume)
        return () => reset()
    }, [resume.id]);
    
    return (
        <div>
            <h1 className="text-xl pb-1 border-b font-semibold mb-1">Skills</h1>
            <ExpandableWrapper open={!loading} initialMaxHeight="max-h-24">
                {loading ? <Loading /> : (
                    <>
                        <ListSkills skills={skills} />
                        <FormSkill resumeId={resume.id} />
                    </>
                )}
            </ExpandableWrapper>
        </div>
    )
}