
import AddEducation from "./education/AddEducation";
import { getResume } from "@/lib/actions";

export default async function Resume({ id }: { id: string }) {
    const resume = await getResume(id);

    return (
        <div>
            {JSON.stringify(resume)}
            <AddEducation id={resume.id}/>
        </div> 
    )
}