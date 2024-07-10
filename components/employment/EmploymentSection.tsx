import ListEmployments from "./ListEmployments";
import FormEmployment from "./FormEmployment";
import { Resume } from "@prisma/client";
import useEmployment from "@/hooks/useEmployment";
import { useEffect } from "react";
import Loading from "@/app/loading";

export default function EmploymentSection({ resume }: { resume: Resume }) {
    const { employments, loading, error, fetch, reset } = useEmployment();
    
    useEffect(() => {
        fetch(resume)
        return () => reset()
    }, [resume.id]);

    if (loading || !employments) return <Loading />
    if (error) return <p>Error: {error}</p>

    return (
        <>
            <ListEmployments employments={[...employments]} />
            <FormEmployment resumeId={resume.id} />
        </>
    )
}