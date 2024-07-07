import Loading from "@/app/loading";
import { Suspense } from "react";
import ListHistory from "./ListHistory";
import FormHistory from "./FormHistory";
import { EmploymentHistory } from "@prisma/client";

export default function HistorySection({ employmentId, history }: { employmentId: string, history: EmploymentHistory[] }) {
    return (
        <>
            <ListHistory history={history} />
            <Suspense fallback={<Loading/>}>
                <FormHistory employmentId={employmentId}/>
            </Suspense>
        </>
    )
}