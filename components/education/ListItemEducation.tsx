"use client"

import { Education } from "@prisma/client";
import { useState } from "react";
import FormEducation from "./FormEducation";
import useEducation from "@/hooks/useEducation";
import { ListButton } from "@/components/list";
import { getDisplayDateFromDate } from "@/util/date";

export default function ListItemEducation(education: Education) {
    const { remove } = useEducation();
    const [isEditing, setEditing] = useState(false);

    const onDelete = async () => {
        await remove(education);
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
                <ListButton label="Edit" onClick={() => setEditing(true)} />
                <span className="mx-3 h-8 w-px bg-slate-400/20"></span>
                <ListButton label="Delete" onClick={onDelete} />
            </span>
            {isEditing && <FormEducation resumeId={education.resumeId} education={education} isEditing onSave={() => setEditing(false)} />}
        </>
    )
}