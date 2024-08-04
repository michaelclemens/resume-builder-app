import { Form } from "@/components/form";
import { List } from "@/components/list";
import { FormBodyStrength, ListItemStrength } from "@/components";
import { useStrengthForm } from "@/hooks/form";
import { useStrengthList } from "@/hooks/list";
import { getStrengths } from "@/lib/client/strength";
import { StrengthSchemaType } from "@/types/form";
import { Strength } from "@prisma/client";

export default async ({ params: { id } }: { params: { id: string }}) => {
    const strengths = await getStrengths(id);
    return (
        <>
            <List<Strength>
                useListHook={useStrengthList} 
                itemComponent={ListItemStrength} 
                initialItems={strengths}
            />
            <Form<Strength, StrengthSchemaType> 
                parentId={id} 
                useFormHook={useStrengthForm} 
                formBody={FormBodyStrength} 
            />
        </>
    )
}