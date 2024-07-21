"use client"

import { useState } from "react";
import FormEmployment from "./FormEmployment";
import { EmploymentWithHistory } from "@/lib/client/employment";
import HistorySection from "./history/HistorySection";
import useEmployment from "@/hooks/useEmployment";
import { ListButton, ListDivider, LoadingOverlay } from "@/components/list";
import ExpandableWrapper from "../ExpandableWrapper";

export default function ListItemEmployment(employment: EmploymentWithHistory) {
    const { remove } = useEmployment();
    const [editing, setEditing] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const onDelete = async () => {
        setDeleting(true);
        try {
            await remove(employment);
        } catch(error) {
            console.error(error);
        } finally {
            setDeleting(false);
        }  
    }

    return (
        <>
            <span className="w-2/4 flex-none">{employment.employer}</span>
            {employment.city && <span>{employment.city}</span>}
            <span className="ml-auto flex items-cente font-medium">
                <ListButton type="edit" onClick={() => setEditing(!editing)} />
                <ListDivider />
                <ListButton type="delete" onClick={onDelete} />
            </span>
            <ExpandableWrapper open={editing && !deleting}>
                <FormEmployment resumeId={employment.resumeId} employment={employment} editing onSave={() => setEditing(false)} />
            </ExpandableWrapper>
            {deleting && <LoadingOverlay />}

            <HistorySection employmentId={employment.id} histories={[...employment.history]}/>
        </>
    )
}