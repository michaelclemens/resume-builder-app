"use client"

import { Skill } from "@prisma/client";
import { useState } from "react";
import FormSkill from "./FormSkill";
import useSkill from "@/hooks/useSkill";
import { ListButton } from "@/components/list";

export default function ListItemSkill(skill: Skill) {
    const { remove } = useSkill();
    const [isEditing, setEditing] = useState(false);

    const onDelete = async () => {
        await remove(skill);
    }

    return (
        <>
            <span className="w-3/4 flex-none">{skill.name}</span>
            <span className="ml-auto flex items-cente font-medium">
                <ListButton label="Edit" onClick={() => setEditing(true)} />
                <span className="mx-3 h-8 w-px bg-slate-400/20"></span>
                <ListButton label="Delete" onClick={onDelete} />
            </span>
            {isEditing && <FormSkill resumeId={skill.resumeId} skill={skill} isEditing onSave={() => setEditing(false)} />}
        </>
    )
}