"use client"

import useEducation from "@/hooks/useEducation";
import { Education } from "@prisma/client";
import { FormEvent, useState } from "react";
import { InputText, SubmitButton } from "@/components/form";
import { getDisplayDateFromDate } from '@/util/date';

export default function FormEducation({ resumeId, education, isEditing = false, onSave = () => {} }: { resumeId: string, education?: Education, isEditing?: boolean, onSave?: () => void }) {
    const { save } = useEducation();
    const [saving, setSaving] = useState(false);

    const onSubmit = async(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSaving(true);
        try {
            const formData = new FormData(event.currentTarget);
            await save(resumeId, formData, education?.id);
            if (isEditing) { onSave() }
        } catch(error) {
            console.error(error)
        } finally {
            setSaving(false);
        } 
    }

    return (
        <div className="mt-3 bg-gray-50 p-3 rounded-lg">
            <form onSubmit={onSubmit}>
                <div className="grid grid-cols-2 gap-5">
                    <InputText name="school" label="School" defaultValue={education?.school} required disabled={saving} />
                    <InputText name="city" label="City" defaultValue={education?.city ?? undefined} disabled={saving} />
                </div>
                <InputText name="degree" label="Degree" defaultValue={education?.degree} required disabled={saving} />
                <div className="grid grid-cols-2 gap-5">
                    <InputText type="date" name="start_date" label="Start Date" defaultValue={getDisplayDateFromDate(education?.startDate)} required disabled={saving} />
                    <InputText type="date" name="end_date" label="End Date" defaultValue={getDisplayDateFromDate(education?.endDate ?? undefined)} disabled={saving} />
                </div>
                <InputText type="rte" name="description" label="Descripition" defaultValue={education?.description ?? undefined} disabled={saving} />

                <SubmitButton label={isEditing ? 'Save' : 'Add Education'} disabled={saving} />
            </form>
        </div>
    )
}