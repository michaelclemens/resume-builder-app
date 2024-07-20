"use client"

import { useState } from "react";
import FormEmployment from "./FormEmployment";
import { EmploymentWithHistory } from "@/lib/client/employment";
import HistorySection from "./history/HistorySection";
import useEmployment from "@/hooks/useEmployment";
import { ListButton } from "@/components/list";

export default function ListItemEmployment(employment: EmploymentWithHistory) {
    const { remove } = useEmployment();
    const [isEditing, setEditing] = useState(false);

    const onDelete = async () => {
        await remove(employment);
    }

    return (
        <>
            <span className="w-2/4 flex-none">{employment.employer}</span>
            {employment.city && <span>{employment.city}</span>}
            <span className="ml-auto flex items-cente font-medium">
                <ListButton label="Edit" onClick={() => setEditing(true)} />
                <span className="mx-3 h-8 w-px bg-slate-400/20"></span>
                <ListButton label="Delete" onClick={onDelete} />
            </span>
            {isEditing && <FormEmployment resumeId={employment.resumeId} employment={employment} isEditing onSave={() => setEditing(false)} />}

            <HistorySection employmentId={employment.id} histories={[...employment.history]}/>
        </>
    )
}