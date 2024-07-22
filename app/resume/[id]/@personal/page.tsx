import { PersonalSection } from "@/components";

export default ({ params: { id } }: { params: { id: string }}) => <PersonalSection resumeId={id} />