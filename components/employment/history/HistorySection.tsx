import ListHistory from "./ListHistory";
import FormHistory from "./FormHistory";
import { EmploymentHistory } from "@prisma/client";

export default function HistorySection({ employmentId, histories }: { employmentId: string, histories: EmploymentHistory[] }) {
    return (
        <div className="w-full mt-3 mb-1 bg-gray-100 px-2 py-3 rounded-lg ring-1 ring-slate-700/10">
            <h3 className="text-sm pb-1 text-center font-semibold">Employment History</h3>
            <ListHistory employmentId={employmentId} histories={histories} />
            <FormHistory employmentId={employmentId}/>
        </div>
    )
}