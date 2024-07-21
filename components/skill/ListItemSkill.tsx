"use client"

import { Skill } from "@prisma/client";
import { useState } from "react";
import FormSkill from "./FormSkill";
import useSkill from "@/hooks/useSkill";
import { ListButton, ListDivider, LoadingOverlay } from "@/components/list";
import ExpandableWrapper from '@/components/ExpandableWrapper';

export default function ListItemSkill(skill: Skill) {
    const { remove } = useSkill();
    const [editing, setEditing] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const onDelete = async () => {
        setDeleting(true);
        try {
            await remove(skill);
        } catch(error) {
            console.error(error);
        } finally {
            setDeleting(false);
        }  
    }

    return (
        <>
            <span className="w-3/4 flex-none">{skill.name}</span>
            <span className="ml-auto flex font-medium">
                <ListButton type="edit" onClick={() => setEditing(!editing)} />
                <ListDivider />
                <ListButton type="delete" onClick={onDelete} />
            </span>
            <ExpandableWrapper open={editing && !deleting}>
                <FormSkill resumeId={skill.resumeId} skill={skill} editing onSave={() => setEditing(false)} />
            </ExpandableWrapper>
            {deleting && <LoadingOverlay />}
        </>
    )
}