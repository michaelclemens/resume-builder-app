"use client"

import { Skill } from "@prisma/client";
import { ListButton, ListDivider, LoadingOverlay } from "@/components/list";
import { ExpandableWrapper } from '@/components/util';
import { SkillSchemaType } from "@/types/form";
import { Form } from "../form";
import { useSkillForm } from "@/hooks/form";
import { FormBodySkill } from "@/components";
import { ItemComponentProps } from "@/types/hook";

export default function({ item: skill, remove, setEditing, editing, deleting }: ItemComponentProps<Skill>) {
    return (
        <>
            <span className="w-3/4 flex-none">{skill.name}</span>
            <span className="ml-auto flex font-medium">
                <ListButton type="edit" onClick={() => setEditing(!editing)} />
                <ListDivider />
                <ListButton type="delete" onClick={async() => remove(skill)} />
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