"use client"

import { EmploymentHistory } from "@prisma/client";
import { useState } from "react";
import FormHistory from "./FormHistory";
import useEmploymentHistory from "@/hooks/useEmploymentHistory";
import { ListButton, ListDivider, LoadingOverlay } from "@/components/list";
import { getDisplayDateFromDate } from "@/util/date";
import ExpandableWrapper from "@/components/ExpandableWrapper";


export default function ListItemHistory(history: EmploymentHistory) {
    const { remove } = useEmploymentHistory();
    const [editing, setEditing] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const onDelete = async () => {
        setDeleting(true);
        try {
            await remove(history);
        } catch(error) {
            console.error(error);
        } finally {
            setDeleting(false);
        }  
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
            <span className="ml-auto flex items-center justify-center font-medium">
                <ListButton type="edit" onClick={() => setEditing(!editing)}/>
                <ListDivider />
                <ListButton type="delete" onClick={onDelete}/>
            </span>
            <ExpandableWrapper open={editing && !deleting}>
                <FormHistory employmentId={history.employmentId} history={history} editing onSave={() => setEditing(false)} />
            </ExpandableWrapper>
            {deleting && <LoadingOverlay />}
        </>
    )
}