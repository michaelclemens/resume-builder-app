import { SectionForm } from "@/components/form";
import { getPersonal } from "@/lib/client/personal";
import { PersonalSchemaType } from "@/types/form";
import { SectionEnums } from "@/types/section";
import { Personal } from "@prisma/client";

export default async ({ params: { id } }: { params: { id: string }}) => {
    const personal = await getPersonal(id);
    return (
        <SectionForm<Personal, PersonalSchemaType> 
            sectionType={SectionEnums.personal}
            parentId={id}
            item={personal ?? undefined}
        />
    )
}