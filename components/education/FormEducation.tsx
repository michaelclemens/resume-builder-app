"use client"

import useEducation from "@/hooks/useEducation";
import { Education } from "@prisma/client";
import { FormEvent } from "react";
import { RichTextEditor } from "@/components/form";

export default function FormEducation({ resumeId, education, isEditing = false, onSave = () => {} }: { resumeId: string, education?: Education, isEditing?: boolean, onSave?: () => void }) {
    const { save } = useEducation();

    const onSubmit = async(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        
        await save(resumeId, formData, education?.id);
        if (isEditing) {
            onSave();
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <label htmlFor="school">School:</label>
            <input type="text" name="school" defaultValue={education?.school ?? ''} required />

            <label htmlFor="degree">Degree:</label>
            <input type="text" name="degree" defaultValue={education?.degree ?? ''} required />

            <label htmlFor="start_date">Start & End Date:</label>
            <input type="date" name="start_date" defaultValue={education?.startDate ? new Date(education.startDate).toISOString().substring(0, 10) : ''} required />
            <input type="date" name="end_date" defaultValue={education?.endDate ? new Date(education.endDate).toISOString().substring(0, 10) : ''} />

            <label htmlFor="city">City:</label>
            <input type="text" name="city" defaultValue={education?.city ?? ''} />

            <label htmlFor="description">Descripition:</label>
            <RichTextEditor name="description" defaultValue={education?.description ?? ''} />

            <button type="submit">{isEditing ? 'Save' : 'Add Education'}</button>
        </form>
    )
}