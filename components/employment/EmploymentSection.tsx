import ListEmployments from "./ListEmployments";
import FormEmployment from "./FormEmployment";
import { EmploymentWithHistory } from "@/lib/client/employment";

export default function EmploymentSection({ resumeId, initialEmployments }: { resumeId: string, initialEmployments?: EmploymentWithHistory[] }) {
    return (
        <>
            <ListEmployments initialEmployments={initialEmployments} />
            <FormEmployment resumeId={resumeId} />
        </>
    )
}