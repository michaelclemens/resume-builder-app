"use client"

import { Education } from "@prisma/client";
import { ListButton, ListDivider, LoadingOverlay } from "@/components/list";
import { getDisplayDateFromDate } from "@/util/date";
import { ExpandableWrapper } from "@/components/util";
import { Form } from "../form";
import { EducationSchemaType } from "@/types/form";
import { useEducationForm } from "@/hooks/form";
import { FormBodyEducation } from "@/components";
import { ItemComponentProps } from "@/types/hook";

export default function({ item: education, remove, setEditing, editing, deleting }: ItemComponentProps<Education>) {
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
                <Form<Education, EducationSchemaType> 
                    parentId={education.resumeId} 
                    useFormHook={useEducationForm}
                    formBody={FormBodyEducation}
                    item={education} 
                    onSave={() => setEditing(false)}
                />
            </ExpandableWrapper>
            {deleting && <LoadingOverlay />}
        </>
    )
}