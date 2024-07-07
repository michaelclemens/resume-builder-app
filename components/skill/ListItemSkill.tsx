"use client"

import { Skill } from "@prisma/client";
import { useState } from "react";
import FormSkill from "./FormSkill";
import { deleteSkill } from "@/lib/client/skill";

export default function ListItemSkill(skill: Skill) {
    const [isEditing, setEditing] = useState(false);

    const onDelete = async () => {
        await deleteSkill(skill.id);
    }

    const renderItem = () => {
        if (isEditing) {
            return <FormSkill resumeId={skill.resumeId} skill={skill} isEditing onSave={() => setEditing(false)} />
        }

        return (
            <>
                <div>{skill.name}</div>
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