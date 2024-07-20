"use client"

import { Strength } from "@prisma/client";
import { useState } from "react";
import FormStrength from "./FormStrength";
import useStrength from "@/hooks/useStrength";
import { ListButton } from "@/components/list";

export default function ListItemStrength({ strength }: { strength: Strength }) {
    const { remove } = useStrength();
    const [isEditing, setEditing] = useState(false);

    const onDelete = async () => {
        await remove(strength);
    }

    return (
        <>
            <span className="w-3/4 flex-none">{strength.name}</span>
            <span className="ml-auto flex items-cente font-medium">
                <ListButton label="Edit" onClick={() => setEditing(true)} />
                <span className="mx-3 h-8 w-px bg-slate-400/20"></span>
                <ListButton label="Delete" onClick={onDelete} />
            </span>
            {isEditing && <FormStrength resumeId={strength.resumeId} strength={strength} isEditing onSave={() => setEditing(false)} />}
        </>
    )
}