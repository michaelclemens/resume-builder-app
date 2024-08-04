"use client"

import { EmploymentHistory } from "@prisma/client";
import { ListButton, ListDivider, LoadingOverlay } from "@/components/list";
import { getDisplayDateFromDate } from "@/util/date";
import { ExpandableWrapper } from "@/components/util";
import { Form } from "@/components/form";
import { useEmploymentHistoryForm } from "@/hooks/form";
import { FormBodyHistory } from "@/components";
import { EmploymentHistorySchemaType } from "@/types/form";
import { ItemComponentProps } from "@/types/hook";

export default function ({ item: history, remove, setEditing, editing, deleting }: ItemComponentProps<EmploymentHistory>) {   
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
                <ListButton type="delete" onClick={async() => remove(history)}/>
            </span>
            <ExpandableWrapper open={editing && !deleting}>
                <Form<EmploymentHistory, EmploymentHistorySchemaType>
                    parentId={history.employmentId} 
                    useFormHook={useEmploymentHistoryForm}
                    formBody={FormBodyHistory}
                    item={history} 
                    onSave={() => setEditing(false)}
                />
            </ExpandableWrapper>
            {deleting && <LoadingOverlay />}
        </>
    )
}