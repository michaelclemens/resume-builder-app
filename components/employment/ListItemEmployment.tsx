"use client"

import { useState } from "react";
import { EmploymentWithHistory } from "@/lib/client/employment";
import HistorySection from "./history/HistorySection";
import { useEmploymentList } from "@/hooks/list";
import { ListButton, ListDivider, LoadingOverlay } from "@/components/list";
import { ExpandableWrapper } from "@/components/util";
import { Form } from "../form";
import { EmploymentSchemaType } from "@/types/form";
import { useEmploymentForm } from "@/hooks/form";
import { FormBodyEmployment } from "@/components";

export default function ListItemEmployment(employment: EmploymentWithHistory) {
    const { remove } = useEmploymentList();
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
                <Form<EmploymentWithHistory, EmploymentSchemaType>
                    parentId={employment.resumeId}
                    useFormHook={useEmploymentForm}
                    formBody={FormBodyEmployment}
                    item={employment} 
                    onSave={() => setEditing(false)}
                />
            </ExpandableWrapper>
            {deleting && <LoadingOverlay />}

            <HistorySection employmentId={employment.id} histories={employment.history} />
        </>
    )
}