import { getAllResumes } from "@/lib/client/resume";
import { sortByLatestCreated } from "@/util/sort";
import Link from "next/link";

export default async function ListResumes() {
    const resumes = await getAllResumes();

    if (!resumes) { return }

    return (
        <div>
            {resumes
                .sort(sortByLatestCreated)
                .map(({ id }) => (
                    <div key={id}>
                        #{id}
                        <Link href={`/resume/${id}`}>Edit</Link>
                    </div>
            ))}
        </div>
    )
}