"use client"

import { Employment } from "@prisma/client";
import { useState } from "react";
import FormEmployment from "./FormEmployment";
import { deleteEmployment } from "@/lib/client/employment";

export default function ListItemEmployment(employment: Employment) {
    const [isEditing, setEditing] = useState(false);

    const onDelete = async () => {
        await deleteEmployment(employment.id);
    }

    const renderItem = () => {
        if (isEditing) {
            return <FormEmployment resumeId={employment.resumeId} employment={employment} isEditing onSave={() => setEditing(false)} />
        }

        return (
            <>
                <div>Employer: {employment.employer}</div>
                {employment.city && <div>City: {employment.city}</div>}
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