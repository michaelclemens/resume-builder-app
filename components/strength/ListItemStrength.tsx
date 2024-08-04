"use client"

import { Strength } from "@prisma/client";
import { ListButton, ListDivider, LoadingOverlay } from "@/components/list";
import { ExpandableWrapper } from "@/components/util";
import { ButtonType } from "@/types/list";
import { useStrengthForm } from "@/hooks/form";
import { Form } from "../form";
import { FormBodyStrength } from "@/components";
import { StrengthSchemaType } from "@/types/form";
import { ItemComponentProps } from "@/types/hook";

export default function({ item: strength, remove, setEditing, editing, deleting }: ItemComponentProps<Strength>) {
    return (
        <>
            <span className="w-3/4 flex-none">{strength.name}</span>
            <span className="ml-auto flex font-medium">
                <ListButton type={ButtonType.edit} onClick={() => setEditing(!editing)} />
                <ListDivider />
                <ListButton type={ButtonType.delete} onClick={async() => remove(strength)} />
            </span>
            <ExpandableWrapper open={editing && !deleting}>
                <Form<Strength, StrengthSchemaType>
                    parentId={strength.resumeId}  
                    useFormHook={useStrengthForm}
                    formBody={FormBodyStrength}
                    item={strength}
                    onSave={() => setEditing(false)} 
                />
            </ExpandableWrapper>
            {deleting && <LoadingOverlay />}
        </>
    )
}