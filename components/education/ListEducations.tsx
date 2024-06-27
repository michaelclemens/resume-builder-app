import { getEducations } from "@/lib/actions";
import ListItemEducation from "./ListItemEducation";

export default async function ListEducations({ resumeId }: { resumeId: string }) {
    const educations = await getEducations(resumeId);

    if (!educations || !educations.length) { return <p>No Educations</p> }

    return (
        <div>
            {educations
                .sort((a, b) => (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()))
                .map((education) => <ListItemEducation key={education.id} {...education} />)}
        </div>
    )
}