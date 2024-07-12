"use client"

import { Education } from "@prisma/client";
import { useState } from "react";
import FormEducation from "./FormEducation";
import useEducation from "@/hooks/useEducation";

export default function ListItemEducation(education: Education) {
    const { remove } = useEducation();
    const [isEditing, setEditing] = useState(false);

    const onDelete = async () => {
        await remove(education);
    }

    const renderItem = () => {
        if (isEditing) {
            return <FormEducation resumeId={education.resumeId} education={education} isEditing onSave={() => setEditing(false)} />
        }

        return (
            <>
                <span>School: {education.school}</span>
                <span>Degree: {education.degree}</span>
                <span>Start Date: {new Date(education.startDate).toDateString()}</span>
                {education.endDate && <span>End Date: {new Date(education.endDate).toDateString()}</span>}
                {education.city && <span>City: {education.city}</span>}
                {education.description && <span>Description: {education.description}</span>}
                <button type="button" onClick={() => setEditing(true)}>Edit</button>
            </>
        )
    }

    return (
        <div>
            {renderItem()}
            <button type="button" onClick={onDelete}>Delete</button>
        </div>
    )
}