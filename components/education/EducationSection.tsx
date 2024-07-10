import ListEducations from "./ListEducations";
import FormEducation from "./FormEducation";
import { Education } from "@prisma/client";

export default function EducationSection({ resumeId, educations }: { resumeId: string, educations: Education[] }) {
    return (
        <>
            <ListEducations educations={educations} />
            <FormEducation resumeId={resumeId} />
        </>
    )
}