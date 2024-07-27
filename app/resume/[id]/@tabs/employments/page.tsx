import { EmploymentSection } from "@/components";

export default async({ params: { id } }: { params: { id: string }}) => {
    return <EmploymentSection resumeId={id} />
}