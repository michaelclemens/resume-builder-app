"use client"

import usePersonal from "@/hooks/usePersonal";
import { Resume } from "@prisma/client";
import { FormEvent, useEffect, useState } from "react";
import { InputText, SubmitButton } from '@/components/form';
import Loading from "@/app/loading";

export default function FormPersonal({ resume }: { resume: Resume }) {
    const { personal, loading, fetch, save, reset } = usePersonal();
    const [saving, setSaving] = useState(false);
    
    useEffect(() => {
        fetch(resume)
        return () => reset()
    }, [resume.id])

    const onSubmit = async(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSaving(true);
        try {
            const formData = new FormData(event.currentTarget);
            await save(resume, formData, personal?.id);
        } catch(error) {
            console.error(error)
        } finally {
            setSaving(false);
        } 
    }

    return (
        <div>
            <h1 className="text-xl pb-1 border-b font-semibold mb-1">Personal</h1>
            <div className={`transition-max-height ease-in duration-500 overflow-hidden ${loading ? 'max-h-24' : 'max-h-full'}`}>
                {loading ? <Loading /> : (
                    <div className="mb-3 mt-2 mx-1 bg-gray-50 p-3 rounded-lg ring-1 ring-slate-700/10">
                        <form onSubmit={onSubmit}>
                            <div className="grid grid-cols-2 gap-5">
                                <InputText name="first_name" label="First Name" defaultValue={personal?.firstName} required disabled={saving} />
                                <InputText name="last_name" label="Last Name" defaultValue={personal?.lastName} required disabled={saving} />
                            </div>
                            <InputText name="position" label="Position" defaultValue={personal?.position ?? undefined} disabled={saving} />
                            <InputText type="rte" name="summary" label="Summary" defaultValue={personal?.summary ?? undefined} disabled={saving} />
                            <div className="grid grid-cols-2 gap-5">
                                <InputText type="email" name="email" label="Email" defaultValue={personal?.email ?? undefined} disabled={saving} />
                                <InputText type="phone" name="phone" label="Phone" defaultValue={personal?.phone ?? undefined} disabled={saving} />
                            </div>
                            <div className="grid grid-cols-2 gap-5">
                                <InputText name="city" label="City" defaultValue={personal?.city ?? undefined} disabled={saving} />
                                <InputText name="country" label="Country" defaultValue={personal?.country ?? undefined} disabled={saving} />
                            </div>

                            <SubmitButton label="Save" disabled={saving} />
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}