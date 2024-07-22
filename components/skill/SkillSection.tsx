"use client"

import ListSkills from "./ListSkills";
import FormSkill from "./FormSkill";
import Loading from "@/app/loading";
import { useSkill } from "@/hooks/";
import { useEffect } from "react";
import { ExpandableWrapper } from "@/components/util";
import { Skill } from "@prisma/client";

export default function SkillSection({ resumeId, skills: initialSkills }: { resumeId: string, skills: Skill[] }) {
    const { skills: stateSkills, set } = useSkill();

    useEffect(() => {
        set(initialSkills)
    }, [resumeId])

    let skills = stateSkills ? [...stateSkills] : initialSkills;
    
    return (
        <div>
            <h1 className="text-xl pb-1 border-b font-semibold mb-1">Skills</h1>
            <ExpandableWrapper open={!!skills} initialMaxHeight="max-h-24">
                {!skills ? <Loading /> : (
                    <>
                        <ListSkills skills={skills} />
                        <FormSkill resumeId={resumeId} />
                    </>
                )}
            </ExpandableWrapper>
        </div>
    )
}