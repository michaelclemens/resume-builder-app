import ListHistory from "./ListHistory";
import FormHistory from "./FormHistory";
import { EmploymentHistory } from "@prisma/client";

export default function HistorySection({ employmentId, history }: { employmentId: string, history: EmploymentHistory[] }) {
    return (
        <>
            <ListHistory history={history} />
            <FormHistory employmentId={employmentId}/>
        </>
    )
}