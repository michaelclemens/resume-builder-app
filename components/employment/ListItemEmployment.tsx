"use client"

import { useState } from "react";
import FormEmployment from "./FormEmployment";
import { EmploymentWithHistory } from "@/lib/client/employment";
import HistorySection from "./history/HistorySection";
import useEmployment from "@/hooks/useEmployment";

export default function ListItemEmployment(employment: EmploymentWithHistory) {
    const { remove } = useEmployment();
    const [isEditing, setEditing] = useState(false);

    const onDelete = async () => {
        await remove(employment);
    }

    const renderItem = () => {
        if (isEditing) {
            return <FormEmployment resumeId={employment.resumeId} employment={employment} isEditing onSave={() => setEditing(false)} />
        }

        return (
            <>
                <div>Employer: {employment.employer}</div>
                {employment.city && <div>City: {employment.city}</div>}
                <div>Employment History: <HistorySection employmentId={employment.id} history={[...employment.history]}/></div>
                <button type="button" onClick={() => setEditing(true)}>Edit</button>
            </>
        )
    }

    return (
        <div>
            {renderItem()}
            <button type="button" onClick={onDelete}>Delete</button>
        </div>
    )
}