"use client"

import { Education } from "@prisma/client";
import { ListButton, ListDivider } from "@/components/list";
import { getDisplayDateFromDate } from "@/util/date";
import { ExpandableWrapper } from "@/components/util";
import { SectionForm } from "../form";
import { ItemComponentProps } from "@/types/hook";
import { SectionEnums } from "@/types/section";

export default function ListItemEducation({ item: education, remove, setEditing, onSave, editing, deleting }: ItemComponentProps<Education>) {
    return (
        <>
            <div className="flex-auto">
                <div>{education.degree} - {education.school}</div>
                <div className="text-xs mt-1">
                    {getDisplayDateFromDate(education.startDate)}
                    {education.endDate && ` to ${getDisplayDateFromDate(education.endDate)}`}
                </div>
            </div>
            <span className="ml-auto flex items-cente font-medium">
                <ListButton type="edit" onClick={() => setEditing(!editing)} />
                <ListDivider />
                <ListButton type="delete" onClick={async() => remove(education)} />
            </span>
            <ExpandableWrapper open={editing && !deleting}>
                <SectionForm
                    sectionType={SectionEnums.education}
                    parentId={education.resumeId}
                    item={education} 
                    onSave={onSave}
                />
            </ExpandableWrapper>
        </>
    )
}