"use client"

import { Education } from "@prisma/client";
import { useState } from "react";
import FormEducation from "./FormEducation";
import { deleteEducation } from "@/lib/actions";

export default function ListItemEducation(education: Education) {
    const [isEditing, setEditing] = useState(false);

    const onDelete = async () => {
        await deleteEducation(education.id);
    }

    const renderItem = () => {
        if (isEditing) {
            return (
                <>
                    <FormEducation resumeId={education.resumeId} education={education} isEditing onSave={() => setEditing(false)} />
                </>
            )
        }

        return (
            <>
                <div>School: {education.school}</div>
                <div>Degree: {education.degree}</div>
                <div>Start Date: {new Date(education.startDate).toDateString()}</div>
                {education.endDate && <div>End Date: {new Date(education.endDate).toDateString()}</div>}
                {education.city && <div>City: {education.city}</div>}
                {education.description && <div>Description: {education.description}</div>}
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