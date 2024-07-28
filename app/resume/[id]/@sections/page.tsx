import { permanentRedirect } from "next/navigation";

export default async ({ params: { id } }: { params: { id: string }}) => {
    permanentRedirect(`/resume/${id}/personal`);
}