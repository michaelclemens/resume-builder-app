import ListEducations from "./ListEducations";
import FormEducation from "./FormEducation";

export default function EducationSection({ resumeId }: { resumeId: string }) {
    return (
        <>
            <ListEducations resumeId={resumeId} />
            <FormEducation resumeId={resumeId} />
        </>
    )
}