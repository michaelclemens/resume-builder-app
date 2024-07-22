"use client"

import ListSkills from "./ListSkills";
import FormSkill from "./FormSkill";
import { useSkill } from "@/hooks/";
import { useEffect } from "react";
import { Skill } from "@prisma/client";

export default function SkillSection({ resumeId, skills: initialSkills }: { resumeId: string, skills: Skill[] }) {
    const { skills: stateSkills, set } = useSkill();

    useEffect(() => {
        set(initialSkills)
    }, [resumeId])

    let skills = stateSkills ? [...stateSkills] : initialSkills;
    
    return (
        <>
            <ListSkills skills={skills} />
            <FormSkill resumeId={resumeId} />
        </>
    )
}