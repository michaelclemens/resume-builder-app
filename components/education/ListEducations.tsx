import { getEducations } from "@/lib/actions";

export default async function ListEducations({ resumeId }: { resumeId: string }) {
    const educations = await getEducations(resumeId);

    if (!educations || !educations.length) { return <p>No Educations</p> }

    return (
        <div>
            {educations.map((education) => (
                <div key={education.id}>
                    {JSON.stringify(education)}
                </div>
            ))}
        </div>
    )
}