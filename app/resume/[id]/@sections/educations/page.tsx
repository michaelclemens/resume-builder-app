import { Form } from "@/components/form";
import { FormBodyEducation, ListItemEducation } from "@/components";
import { List } from "@/components/list";
import { useEducationList } from "@/hooks/list";
import { getEducations } from "@/lib/client/education";
import { Education } from "@prisma/client";
import { EducationSchemaType } from "@/types/form";
import { useEducationForm } from "@/hooks/form";

export default async({ params: { id } }: { params: { id: string }}) => {
    const educations = await getEducations(id);
    return (
        <>
            <List<Education>
                useListHook={useEducationList} 
                itemComponent={ListItemEducation} 
                initialItems={educations}
            />
            <Form<Education, EducationSchemaType>
                parentId={id}
                useFormHook={useEducationForm}
                formBody={FormBodyEducation}
            />
        </>
    )
}