import ListStrengths from "./ListStrengths";
import FormStrength from "./FormStrength";
import { Resume } from "@prisma/client";
import { useEffect } from "react";
import useStrength from "@/hooks/useStrength";
import Loading from "@/app/loading";

export default function StrengthSection({ resume }: { resume: Resume }) {
    const { strengths, loading, error, fetch, reset } = useStrength();
    
    useEffect(() => {
        fetch(resume)
        return () => reset()
    }, [resume.id]);

    if (loading || !strengths) return <Loading />
    if (error) return <p>Error: {error}</p>
    
    return (
        <>
            <ListStrengths strengths={strengths} />
            <FormStrength resumeId={resume.id} />
        </>
    )
}