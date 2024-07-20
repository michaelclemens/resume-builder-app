"use client"

import { EmploymentHistory } from "@prisma/client";
import { useState } from "react";
import FormHistory from "./FormHistory";
import useEmploymentHistory from "@/hooks/useEmploymentHistory";
import { ListButton } from "@/components/list";
import { getDisplayDateFromDate } from "@/util/date";

export default function ListItemHistory(history: EmploymentHistory) {
    const { remove } = useEmploymentHistory();
    const [isEditing, setEditing] = useState(false);

    const onDelete = async () => {
        await remove(history);
    }
    
    return (
        <>
            <div className="flex-auto">
                <div>{history.title}</div>
                <div className="text-xs mt-1">
                    {getDisplayDateFromDate(history.startDate)}
                    {history.endDate && ` to ${getDisplayDateFromDate(history.endDate)}`}
                </div>
            </div>            
            <span className="ml-auto flex items-cente font-medium">
                <ListButton label="Edit" onClick={() => setEditing(true)} />
                <span className="mx-3 h-8 w-px bg-slate-400/20"></span>
                <ListButton label="Delete" onClick={onDelete} />
            </span>
            {isEditing && <FormHistory employmentId={history.employmentId} history={history} isEditing onSave={() => setEditing(false)} />}
        </>
    )
}