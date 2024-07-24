import { EmploymentSection } from "@/components";
import { getEmployments } from "@/lib/client/employment";

export default async({ params: { id } }: { params: { id: string }}) => {
    const employments = await getEmployments(id);
    return <EmploymentSection resumeId={id} initialEmployments={employments} />
}