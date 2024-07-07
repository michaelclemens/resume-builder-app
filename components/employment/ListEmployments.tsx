import { getEmployments } from "@/lib/actions";
import ListItemEmployment from "./ListItemEmployment";

export default async function ListEmployments({ resumeId }: { resumeId: string }) {
    const educations = await getEducations(resumeId);

    if (!educations || !educations.length) { return <p>No Educations</p> }

    return (
        <div>
            {educations
                .sort((a, b) => (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()))
                .map((education) => <ListItemEmployment key={education.id} {...education} />)}
        </div>
    )
}