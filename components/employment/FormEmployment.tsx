"use client"

import { useEmployment } from "@/hooks";
import { Employment } from "@prisma/client";
import { FormEvent, useState } from "react";
import { InputText, SubmitButton } from "@/components/form";

export default function FormEmployment({ resumeId, employment, editing = false, onSave = () => {} }: { resumeId: string, employment?: Employment, editing?: boolean, onSave?: () => void }) {
    const { save } = useEmployment();
    const [saving, setSaving] = useState(false);

    const onSubmit = async(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSaving(true);
        try {
            const formData = new FormData(event.currentTarget);
            await save(resumeId, formData, employment?.id);
            onSave()
        } catch(error) {
            console.error(error)
        } finally {
            setSaving(false);
        } 
    }

    return (
        <div className="my-3 mx-1 bg-gray-50 p-3 rounded-lg ring-1 ring-slate-700/10">
            <form onSubmit={onSubmit}>
                <div className="grid grid-cols-2 gap-5">
                    <InputText name="employer" label="Employer" defaultValue={employment?.employer} required disabled={saving} />
                    <InputText name="city" label="City" defaultValue={employment?.city ?? undefined} disabled={saving} />
                </div>

                <SubmitButton label={editing ? 'Save' : 'Add Employment'} disabled={saving} />
            </form>
        </div>
    );
}