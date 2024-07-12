import ListHistory from "./ListHistory";
import FormHistory from "./FormHistory";
import { EmploymentHistory } from "@prisma/client";

export default function HistorySection({ employmentId, histories }: { employmentId: string, histories: EmploymentHistory[] }) {
    return (
        <>
            <ListHistory employmentId={employmentId} histories={histories} />
            <FormHistory employmentId={employmentId}/>
        </>
    )
}