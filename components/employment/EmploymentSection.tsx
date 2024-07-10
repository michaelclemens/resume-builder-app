import ListEmployments from "./ListEmployments";
import FormEmployment from "./FormEmployment";
import { EmploymentWithHistory } from "@/lib/client/employment";

export default function EmploymentSection({ resumeId, employments }: { resumeId: string, employments: EmploymentWithHistory[] }) {
    return (
        <>
            <ListEmployments employments={employments} />
            <FormEmployment resumeId={resumeId} />
        </>
    )
}