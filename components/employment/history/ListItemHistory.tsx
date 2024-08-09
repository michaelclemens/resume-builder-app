"use client"

import { EmploymentHistory } from "@prisma/client";
import { ListButton, ListDivider, LoadingOverlay } from "@/components/list";
import { getDisplayDateFromDate } from "@/util/date";
import { ExpandableWrapper } from "@/components/util";
import { SectionForm } from "@/components/form";
import { ItemComponentProps } from "@/types/hook";
import { SectionEnums } from "@/types/section";

export default function ({ item: history, remove, setEditing, onSave, editing, deleting }: ItemComponentProps<EmploymentHistory>) {   
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
                <SectionForm
                    sectionType={SectionEnums.employmentHistory}
                    parentId={history.employmentId} 
                    item={history} 
                    onSave={onSave}
                />
            </ExpandableWrapper>
            {deleting && <LoadingOverlay />}
        </>
    )
}