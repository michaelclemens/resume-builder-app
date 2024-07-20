import ListHistory from "./ListHistory";
import FormHistory from "./FormHistory";
import { EmploymentHistory } from "@prisma/client";

export default function HistorySection({ employmentId, histories }: { employmentId: string, histories: EmploymentHistory[] }) {
    return (
        <>
            <h3 className="text-md mt-2 pb-1 border-b font-semibold mb-1">Employment History</h3>
            <ListHistory employmentId={employmentId} histories={histories} />
            <FormHistory employmentId={employmentId}/>
        </>
    )
}