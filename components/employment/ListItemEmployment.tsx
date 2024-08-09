"use client"

import HistorySection from "./history/HistorySection";
import { ListButton, ListDivider, LoadingOverlay } from "@/components/list";
import { ExpandableWrapper } from "@/components/util";
import { SectionForm } from "../form";
import { ItemComponentProps } from "@/types/hook";
import { EmploymentWithHistory, SectionEnums } from "@/types/section";

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
                <SectionForm
                    sectionType={SectionEnums.employment}
                    parentId={employment.resumeId}
                    item={employment} 
                    onSave={onSave}
                />
            </ExpandableWrapper>
            {deleting && <LoadingOverlay />}

            <HistorySection employmentId={employment.id} histories={employment.history} />
        </>
    )
}