import { FormEmployment, ListEmployments } from "@/components"
import { getEmployments } from "@/lib/client/employment"

export default async({ params: { id } }: { params: { id: string }}) => {
    const employments = await getEmployments(id);
    return (
        <>
            <ListEmployments employments={employments} />
            <FormEmployment resumeId={id} />
        </>
    )
}