"use client"

import { Strength } from "@prisma/client";
import { useState } from "react";
import FormStrength from "./FormStrength";
import useStrength from "@/hooks/useStrength";

export default function ListItemStrength(strength: Strength) {
    const { remove } = useStrength();
    const [isEditing, setEditing] = useState(false);

    const onDelete = async () => {
        await remove(strength);
    }

    const renderItem = () => {
        if (isEditing) {
            return <FormStrength resumeId={strength.resumeId} strength={strength} isEditing onSave={() => setEditing(false)} />
        }

        return (
            <>
                <div>{strength.name}</div>
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