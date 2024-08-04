import { FormBodyPersonal } from "@/components";
import { Form } from "@/components/form";
import { usePersonalForm } from "@/hooks/form";
import { getPersonal } from "@/lib/client/personal";
import { PersonalSchemaType } from "@/types/form";
import { Personal } from "@prisma/client";

export default async ({ params: { id } }: { params: { id: string }}) => {
    const personal = await getPersonal(id);
    return (
        <Form<Personal, PersonalSchemaType> 
            parentId={id}
            useFormHook={usePersonalForm}
            formBody={FormBodyPersonal}
            item={personal ?? undefined}
        />
    )
}