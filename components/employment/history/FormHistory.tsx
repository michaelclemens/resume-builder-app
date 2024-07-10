"use client"

import useEmploymentHistory from "@/hooks/useEmploymentHistory";
import { EmploymentHistory } from "@prisma/client";

export default function FormHistory({ employmentId, history, isEditing = false, onSave = () => {} }: { employmentId: string, history?: EmploymentHistory, isEditing?: boolean, onSave?: () => void }) {
    const { save } = useEmploymentHistory();
    
    async function submitFormAction(formData: FormData) {
        await save(employmentId, formData, history?.id);
        if (isEditing) {
            onSave();
        }
    }

    return (
        <div>
            <form action={submitFormAction}>
                <label htmlFor="title">Title:</label>
                <input type="text" name="title" defaultValue={history?.title ?? ''} required />

                <label htmlFor="start_date">Start & End Date:</label>
                <input type="date" name="start_date" defaultValue={history?.startDate ? new Date(history.startDate).toISOString().substring(0, 10) : ''} required />
                <input type="date" name="end_date" defaultValue={history?.endDate ? new Date(history.endDate).toISOString().substring(0, 10) : ''} />

                <label htmlFor="description">Descripition:</label>
                <textarea name="description" rows={3} defaultValue={history?.description ?? ''} />

                <button type="submit">{isEditing ? 'Save' : 'Add Employment History'}</button>
            </form>
        </div>
    );
}