import ListEducations from "./ListEducations";
import FormEducation from "./FormEducation";
import { Education } from "@prisma/client";

export default function EducationSection({ resumeId, initialEducations }: { resumeId: string, initialEducations?: Education[] }) {
    return (
        <>
            <ListEducations initialEducations={initialEducations} />
            <FormEducation resumeId={resumeId} />
        </>
    )
}