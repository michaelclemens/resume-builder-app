import { StrengthSection } from "@/components";

export default async ({ params: { id } }: { params: { id: string }}) => {
    return <StrengthSection resumeId={id} />
}