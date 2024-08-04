import { Form } from "@/components/form"
import { FormBodyEmployment, ListItemEmployment } from "@/components";
import { List } from "@/components/list";
import { useEmploymentList } from "@/hooks/list";
import { EmploymentWithHistory, getEmployments } from "@/lib/client/employment"
import { EmploymentSchemaType } from "@/types/form";
import { useEmploymentForm } from "@/hooks/form";

export default async({ params: { id } }: { params: { id: string }}) => {
    const employments = await getEmployments(id);
    return (
        <>
            <List<EmploymentWithHistory>
                useListHook={useEmploymentList} 
                itemComponent={ListItemEmployment} 
                initialItems={employments}
            />
            <Form<EmploymentWithHistory, EmploymentSchemaType>
                parentId={id}
                useFormHook={useEmploymentForm}
                formBody={FormBodyEmployment}
            />
        </>
    )
}