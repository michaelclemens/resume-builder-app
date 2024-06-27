import { getAllResumes } from "@/lib/actions";
import Link from "next/link";

export default async function ListResumes() {
    const resumes = await getAllResumes();

    if (!resumes) { return }

    return (
        <div>
            {resumes.map(({ id }) => (
                <div key={id}>
                    #{id}
                    <Link href={`/resume/${id}`}>Edit</Link>
                </div>
            ))}
        </div>
    )
}