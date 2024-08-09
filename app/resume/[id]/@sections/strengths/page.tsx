import { getStrengths } from "@/lib/client/strength";
import { SectionList } from "@/components/list";
import { SectionForm } from "@/components/form";
import { SectionEnums } from "@/types/section";

export default async ({ params: { id } }: { params: { id: string }}) => {
    const strengths = await getStrengths(id);
    return (
        <>
            <SectionList
                sectionType={SectionEnums.strength}
                initialItems={strengths}
            />
            <SectionForm
                sectionType={SectionEnums.strength}
                parentId={id} 
            />
        </>
    )
}