"use client"

import { Skill } from "@prisma/client";
import { useState } from "react";
import FormSkill from "./FormSkill";
import useSkill from "@/hooks/useSkill";

export default function ListItemSkill(skill: Skill) {
    const { remove } = useSkill();
    const [isEditing, setEditing] = useState(false);

    const onDelete = async () => {
        await remove(skill);
    }

    const renderItem = () => {
        if (isEditing) {
            return <FormSkill resumeId={skill.resumeId} skill={skill} isEditing onSave={() => setEditing(false)} />
        }

        return (
            <>
                {skill.name}
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