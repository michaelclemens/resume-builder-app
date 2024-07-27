import ListEmployments from "./ListEmployments";
import FormEmployment from "./FormEmployment";

export default function EmploymentSection({ resumeId }: { resumeId: string }) {
    return (
        <>
            <ListEmployments resumeId={resumeId} />
            <FormEmployment resumeId={resumeId} />
        </>
    )
}