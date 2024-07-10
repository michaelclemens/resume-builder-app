'use client'

import Loading from "@/app/loading";
import { EducationSection, EmploymentSection, FormPersonal, SkillSection, StrengthSection } from "@/components";
import { fetchResume } from "@/lib/redux/reducers/resume";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { useEffect } from "react";

export default function Resume({ id }: { id: string }) {
    const { resume, loading, error } = useAppSelector((state) => state.resume);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchResume(id))
    }, [id])

    if (loading || !resume) return <Loading />
    if (error) return <p>Error: {error}</p>

    return (
        <div>
            {JSON.stringify(resume)}
            <FormPersonal resumeId={resume.id} personal={resume.personal ?? undefined} />
            <EmploymentSection resumeId={resume.id} employments={[...resume.employments]} />
            <EducationSection resumeId={resume.id} educations={[...resume.educations]} />
            <SkillSection resumeId={resume.id} skills={[...resume.skills]} />
            <StrengthSection resumeId={resume.id} strengths={[...resume.strengths]} />
        </div> 
    )
}