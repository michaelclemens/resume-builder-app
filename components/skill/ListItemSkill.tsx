"use client"

import { Skill } from "@prisma/client";
import { ListButton, ListDivider, LoadingOverlay } from "@/components/list";
import { ExpandableWrapper } from '@/components/util';
import { SkillSchemaType } from "@/types/form";
import { SectionForm } from "../form";
import { ItemComponentProps } from "@/types/hook";
import { SectionEnums } from "@/types/section";

export default function({ item: skill, remove, setEditing, onSave, editing, deleting }: ItemComponentProps<Skill>) {
    return (
        <>
            <span className="w-3/4 flex-none">{skill.name}</span>
            <span className="ml-auto flex font-medium">
                <ListButton type="edit" onClick={() => setEditing(!editing)} />
                <ListDivider />
                <ListButton type="delete" onClick={async() => remove(skill)} />
            </span>
            <ExpandableWrapper open={editing && !deleting}>
                <SectionForm<Skill, SkillSchemaType>
                    sectionType={SectionEnums.skill}
                    parentId={skill.resumeId} 
                    item={skill} 
                    onSave={onSave}
                />
            </ExpandableWrapper>
            {deleting && <LoadingOverlay />}
        </>
    )
}