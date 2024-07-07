import { getEducations } from "@/lib/client/education";
import ListItemEducation from "./ListItemEducation";
import { sortByLatestCreated } from "@/util/sort";

export default async function ListEducations({ resumeId }: { resumeId: string }) {
    const educations = await getEducations(resumeId);

    if (!educations || !educations.length) { return <p>No Educations</p> }

    return (
        <div>
            {educations
                .sort(sortByLatestCreated)
                .map((education) => <ListItemEducation key={education.id} {...education} />)}
        </div>
    )
}