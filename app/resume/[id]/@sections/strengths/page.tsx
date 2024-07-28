import { FormStrength, ListStrengths } from "@/components";
import { getStrengths } from "@/lib/client/strength";

export default async ({ params: { id } }: { params: { id: string }}) => {
    const strengths = await getStrengths(id);
    return (
        <>
            <ListStrengths strengths={strengths} />
            <FormStrength resumeId={id} />
        </>
    )
}