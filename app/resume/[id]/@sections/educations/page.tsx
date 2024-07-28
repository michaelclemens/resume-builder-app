import { FormEducation, ListEducations } from "@/components";
import { getEducations } from "@/lib/client/education";

export default async({ params: { id } }: { params: { id: string }}) => {
    const educations = await getEducations(id);
    return (
        <>
            <ListEducations educations={educations} />
            <FormEducation resumeId={id} />
        </>
    )
}