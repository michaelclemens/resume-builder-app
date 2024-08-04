"use client"

import { Education } from "@prisma/client";
import { useState } from "react";
import { useEducationList } from "@/hooks/list";
import { ListButton, ListDivider, LoadingOverlay } from "@/components/list";
import { getDisplayDateFromDate } from "@/util/date";
import { ExpandableWrapper } from "@/components/util";
import { Form } from "../form";
import { EducationSchemaType } from "@/types/form";
import { useEducationForm } from "@/hooks/form";
import { FormBodyEducation } from "@/components";

export default function ListItemEducation(education: Education) {
    const { remove } = useEducationList();
    const [editing, setEditing] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const onDelete = async () => {
        setDeleting(true);
        try {
            await remove(education);
        } catch(error) {
            console.error(error);
        } finally {
            setDeleting(false);
        }  
    }

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
                <ListButton type="delete" onClick={onDelete} />
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