"use client"

import { Strength } from "@prisma/client";
import { useState } from "react";
import FormStrength from "./FormStrength";
import { useStrengthList } from "@/hooks/list";
import { ListButton, ListDivider, LoadingOverlay } from "@/components/list";
import { ExpandableWrapper } from "@/components/util";
import { ButtonType } from "@/types/list";

export default function ListItemStrength(strength: Strength) {
    const { remove } = useStrengthList();
    const [editing, setEditing] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const onDelete = async () => {
        setDeleting(true);
        try {
            await remove(strength);
        } catch(error) {
            console.error(error);
        } finally {
            setDeleting(false);
        }  
    }

    return (
        <>
            <span className="w-3/4 flex-none">{strength.name}</span>
            <span className="ml-auto flex font-medium">
                <ListButton type={ButtonType.edit} onClick={() => setEditing(!editing)} />
                <ListDivider />
                <ListButton type={ButtonType.delete} onClick={onDelete} />
            </span>
            <ExpandableWrapper open={editing && !deleting}>
                <FormStrength resumeId={strength.resumeId} strength={strength} onSave={() => setEditing(false)} />
            </ExpandableWrapper>
            {deleting && <LoadingOverlay />}
        </>
    )
}