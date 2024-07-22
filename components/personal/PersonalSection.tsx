"use client"

import FormPersonal from "@/components/personal/FormPersonal";
import { usePersonal } from "@/hooks";
import { useEffect } from "react";
import Loading from "@/app/loading";
import { ExpandableWrapper } from "@/components/util";

export default ({ resumeId }: { resumeId: string }) => {
    const { personal, loading, fetch, reset } = usePersonal();
    
    useEffect(() => {
        fetch(resumeId)
        return () => reset()
    }, [resumeId]);

    return (
        <div>
            <h1 className="text-xl pb-1 border-b font-semibold mb-1">Personal</h1>
            <ExpandableWrapper open={!loading} initialMaxHeight="max-h-24">
                {loading ? <Loading /> : <FormPersonal resumeId={resumeId} personal={personal ?? undefined} />}
            </ExpandableWrapper>
        </div>
    )
}