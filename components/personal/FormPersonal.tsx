"use client"

import Loading from "@/app/loading";
import usePersonal from "@/hooks/usePersonal";
import { Resume } from "@prisma/client";
import { FormEvent, useEffect } from "react";
import InputText from '../InputText';
import SubmitButton from '../SubmitButton';

export default function FormPersonal({ resume }: { resume: Resume }) {
    const { personal, loading, error, fetch, save, reset } = usePersonal();
    
    useEffect(() => {
        fetch(resume)
        return () => reset()
    }, [resume.id])

    const onSubmit = async(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        await save(resume, formData, personal?.id);
    }

    if (loading || !personal) return <Loading />
    if (error) return <p>Error: {error}</p>

    return (
        <div className="mb-5">
            <h1 className="text-xl pb-1 border-b font-semibold mb-3">Personal</h1>
            <form onSubmit={onSubmit}>
                <div className="grid grid-cols-2 gap-5">
                    <InputText name="first_name" label="First Name" defaultValue={personal.firstName} required />
                    <InputText name="last_name" label="Last Name" defaultValue={personal.lastName} required />
                </div>
                <InputText name="position" label="Position" defaultValue={personal.position ?? undefined} />
                <InputText type="rte" name="summary" label="Summary" defaultValue={personal.summary ?? undefined} />
                <div className="grid grid-cols-2 gap-5">
                    <InputText type="email" name="email" label="Email" defaultValue={personal.email ?? undefined} />
                    <InputText type="phone" name="phone" label="Phone" defaultValue={personal.phone ?? undefined} />
                </div>
                <div className="grid grid-cols-2 gap-5">
                    <InputText name="city" label="City" defaultValue={personal.city ?? undefined} />
                    <InputText name="country" label="Country" defaultValue={personal.country ?? undefined} />
                </div>

                <SubmitButton label="Save" />
            </form>
        </div>
    );
}