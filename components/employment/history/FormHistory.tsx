"use client"

import RichTextEditor from "@/components/RichTextEditor";
import useEmploymentHistory from "@/hooks/useEmploymentHistory";
import { EmploymentHistory } from "@prisma/client";
import { FormEvent } from "react";

export default function FormHistory({ employmentId, history, isEditing = false, onSave = () => {} }: { employmentId: string, history?: EmploymentHistory, isEditing?: boolean, onSave?: () => void }) {
    const { save } = useEmploymentHistory();
    
    const onSubmit = async(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        await save(employmentId, formData, history?.id);
        if (isEditing) {
            onSave();
        }
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <label htmlFor="title">Title:</label>
                <input type="text" name="title" defaultValue={history?.title ?? ''} required />

                <label htmlFor="start_date">Start & End Date:</label>
                <input type="date" name="start_date" defaultValue={history?.startDate ? new Date(history.startDate).toISOString().substring(0, 10) : ''} required />
                <input type="date" name="end_date" defaultValue={history?.endDate ? new Date(history.endDate).toISOString().substring(0, 10) : ''} />

                <label htmlFor="description">Descripition:</label>
                <RichTextEditor name="description" defaultValue={history?.description ?? ''} />

                <button type="submit">{isEditing ? 'Save' : 'Add Employment History'}</button>
            </form>
        </div>
    );
}