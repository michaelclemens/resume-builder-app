import ListSkills from "./ListSkills";
import FormSkill from "./FormSkill";
import Loading from "@/app/loading";
import useSkill from "@/hooks/useSkill";
import { Resume } from "@prisma/client";
import { useEffect } from "react";

export default function SkillSection({ resume }: { resume: Resume }) {
    const { skills, loading, error, fetch, reset } = useSkill();
    
    useEffect(() => {
        fetch(resume)
        return () => reset()
    }, [resume.id]);

    if (loading || !skills) return <Loading />
    if (error) return <p>Error: {error}</p>
    
    return (
        <>
            <ListSkills skills={skills} />
            <FormSkill resumeId={resume.id} />
        </>
    )
}