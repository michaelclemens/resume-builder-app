"use client"

import { EmploymentHistory } from "@prisma/client";
import { useState } from "react";
import FormHistory from "./FormHistory";
import useEmploymentHistory from "@/hooks/useEmploymentHistory";

export default function ListItemHistory(history: EmploymentHistory) {
    const { remove } = useEmploymentHistory();
    const [isEditing, setEditing] = useState(false);

    const onDelete = async () => {
        await remove(history);
    }

    const renderItem = () => {
        if (isEditing) {
            return <FormHistory employmentId={history.employmentId} history={history} isEditing onSave={() => setEditing(false)} />
        }

        return (
            <>
                <div>Title: {history.title}</div>
                <div>Start Date: {new Date(history.startDate).toDateString()}</div>
                {history.endDate && <div>End Date: {new Date(history.endDate).toDateString()}</div>}
                {history.description && <div>Description: {history.description}</div>}
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