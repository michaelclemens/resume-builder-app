"use client"

import { EmploymentWithHistory } from "@/lib/client/employment";
import HistorySection from "./history/HistorySection";
import { ListButton, ListDivider, LoadingOverlay } from "@/components/list";
import { ExpandableWrapper } from "@/components/util";
import { Form } from "../form";
import { EmploymentSchemaType } from "@/types/form";
import { useEmploymentForm } from "@/hooks/form";
import FormBodyEmployment from "./FormBodyEmployment";
import { ItemComponentProps } from "@/types/hook";

export default function ListItemEmployment({ item: employment, remove, setEditing, onSave, editing, deleting }: ItemComponentProps<EmploymentWithHistory>) {
    return (
        <>
            <span className="w-2/4 flex-none">{employment.employer}</span>
            {employment.city && <span>{employment.city}</span>}
            <span className="ml-auto flex items-cente font-medium">
                <ListButton type="edit" onClick={() => setEditing(!editing)} />
                <ListDivider />
                <ListButton type="delete" onClick={async() => remove(employment)} />
            </span>
            <ExpandableWrapper open={editing && !deleting}>
                <Form<EmploymentWithHistory, EmploymentSchemaType>
                    parentId={employment.resumeId}
                    useFormHook={useEmploymentForm}
                    formBody={FormBodyEmployment}
                    item={employment} 
                    onSave={onSave}
                />
            </ExpandableWrapper>
            {deleting && <LoadingOverlay />}

            <HistorySection employmentId={employment.id} histories={employment.history} />
        </>
    )
}