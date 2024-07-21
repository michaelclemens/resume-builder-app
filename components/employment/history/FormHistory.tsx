"use client"

import useEmploymentHistory from "@/hooks/useEmploymentHistory";
import { EmploymentHistory } from "@prisma/client";
import { FormEvent, useState } from "react";
import { InputText, SubmitButton } from "@/components/form";
import { getDisplayDateFromDate } from "@/util/date";

export default function FormHistory({ employmentId, history, editing = false, onSave = () => {} }: { employmentId: string, history?: EmploymentHistory, editing?: boolean, onSave?: () => void }) {
    const { save } = useEmploymentHistory();
    const [saving, setSaving] = useState(false);
    
    const onSubmit = async(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSaving(true);
        try {
            const formData = new FormData(event.currentTarget);
            await save(employmentId, formData, history?.id);
            onSave();
        } catch(error) {
            console.error(error)
        } finally {
            setSaving(false);
        } 
    }

    return (
        <div className="mt-3 mx-1 mb-1 bg-gray-50 p-3 rounded-lg ring-1 ring-slate-700/10">
            <form onSubmit={onSubmit}>
                <InputText name="title" label="Title" defaultValue={history?.title} required disabled={saving} />

                <div className="grid grid-cols-2 gap-5">
                    <InputText type="date" name="start_date" label="Start Date" defaultValue={getDisplayDateFromDate(history?.startDate)} required disabled={saving} />
                    <InputText type="date" name="end_date" label="End Date" defaultValue={getDisplayDateFromDate(history?.endDate ?? undefined)} disabled={saving} />
                </div>
                <InputText type="rte" name="description" label="Descripition" defaultValue={history?.description ?? undefined} disabled={saving} />

                <SubmitButton label={editing ? 'Save' : 'Add Employment History'} disabled={saving} />
            </form>
        </div>
    );
}