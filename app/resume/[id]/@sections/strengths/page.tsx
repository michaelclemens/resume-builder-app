import { getStrengths } from "@/lib/client/strength";
import { StrengthSchemaType } from "@/types/form";
import { Strength } from "@prisma/client";
import { SectionList } from "@/components/list";
import { SectionForm } from "@/components/form";
import { SectionEnums } from "@/types/section";

export default async ({ params: { id } }: { params: { id: string }}) => {
    const strengths = await getStrengths(id);
    return (
        <>
            <SectionList<Strength>
                sectionType={SectionEnums.strength}
                initialItems={strengths}
            />
            <SectionForm<Strength, StrengthSchemaType> 
                sectionType={SectionEnums.strength}
                parentId={id} 
            />
        </>
    )
}