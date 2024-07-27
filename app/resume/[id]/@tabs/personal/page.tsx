import { FormPersonal } from "@/components";

export default async ({ params: { id } }: { params: { id: string }}) => {
    return <FormPersonal resumeId={id} />
}