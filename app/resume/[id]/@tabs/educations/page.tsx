import { EducationSection } from "@/components";

export default async({ params: { id } }: { params: { id: string }}) => {
    return <EducationSection resumeId={id} />
}