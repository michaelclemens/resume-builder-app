import { PersonalSection } from "@/components";
import { getPersonal } from '@/lib/client/personal';

export default async ({ params: { id } }: { params: { id: string }}) => {
    const personal = await getPersonal(id);
    return <PersonalSection resumeId={id} personal={personal} />
}