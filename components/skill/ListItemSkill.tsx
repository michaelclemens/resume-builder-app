"use client"

import { Skill } from "@prisma/client";
import { useState } from "react";
import { useSkillList } from "@/hooks/list";
import { ListButton, ListDivider, LoadingOverlay } from "@/components/list";
import { ExpandableWrapper } from '@/components/util';
import { SkillSchemaType } from "@/types/form";
import { Form } from "../form";
import { useSkillForm } from "@/hooks/form";
import { FormBodySkill } from "@/components";

export default function ListItemSkill(skill: Skill) {
    const { remove } = useSkillList();
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
                <Form<Skill, SkillSchemaType>
                    parentId={skill.resumeId} 
                    useFormHook={useSkillForm} 
                    formBody={FormBodySkill}
                    item={skill} 
                    onSave={() => setEditing(false)}
                />
            </ExpandableWrapper>
            {deleting && <LoadingOverlay />}
        </>
    )
}