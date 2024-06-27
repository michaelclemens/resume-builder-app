import { addEducationAction } from "@/lib/actions";

export default async function AddEducation({ resumeId }: { resumeId: string }) {
    const addEducationActionWithId = addEducationAction.bind(null, resumeId);
    return (
        <div>
            <form action={addEducationActionWithId}>
                <label htmlFor="school">School:</label>
                <input type="text" name="school" required />

                <label htmlFor="degree">Degree:</label>
                <input type="text" name="degree" required />

                <label htmlFor="start_date">Start & End Date:</label>
                <input type="date" name="start_date" required />
                <input type="date" name="end_date" />

                <label htmlFor="city">City:</label>
                <input type="text" name="city" />

                <label htmlFor="description">Descripition:</label>
                <textarea name="description" rows={3} />

                <button type="submit">Add Education</button>
            </form>
        </div>
    );
}