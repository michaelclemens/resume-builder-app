import ListItemEducation from "./ListItemEducation";
import { sortByLatestCreated } from "@/util/sort";
import { Education } from "@prisma/client";

export default function ListEducations({ educations }: { educations: Education[] }) {
    if (!educations || !educations.length) return <p>No Educations</p>

    return (
        <div>
            {educations
                .sort(sortByLatestCreated)
                .map((education) => <ListItemEducation key={education.id} {...education} />)}
        </div>
    )
}