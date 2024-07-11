"use client"

import { Strength } from "@prisma/client";
import { useState } from "react";
import FormStrength from "./FormStrength";
import useStrength from "@/hooks/useStrength";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';

export default function ListItemStrength({ strength }: { strength: Strength }) {
    const {
        attributes, listeners, setNodeRef, transform, transition,
    } = useSortable({ id: strength.id });
    const { remove } = useStrength();
    const [isEditing, setEditing] = useState(false);

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const onDelete = async () => {
        await remove(strength);
    }

    const renderItem = () => {
        if (isEditing) {
            return <FormStrength resumeId={strength.resumeId} strength={strength} isEditing onSave={() => setEditing(false)} />
        }

        return (
            <>
                {strength.name}
                <button type="button" onClick={() => setEditing(true)}>Edit</button>
            </>
        )
    }

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            {renderItem()}
            <button type="button" onClick={onDelete}>Delete</button>
        </div>
    )
}