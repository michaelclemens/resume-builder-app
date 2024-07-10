"use client"

import Loading from "@/app/loading";
import usePersonal from "@/hooks/usePersonal";
import { Resume } from "@prisma/client";
import { useEffect } from "react";

export default function FormPersonal({ resume }: { resume: Resume }) {
    const { personal, loading, error, fetch, save, reset } = usePersonal();
    
    useEffect(() => {
        fetch(resume)
        return () => reset()
    }, [resume.id])

    async function submitFormAction(formData: FormData) {
        await save(resume, formData, personal?.id);
    }

    if (loading || !personal) return <Loading />
    if (error) return <p>Error: {error}</p>

    return (
        <div>
            <form action={submitFormAction}>
                <label htmlFor="first_name">First Name:</label>
                <input type="text" name="first_name" defaultValue={personal?.firstName ?? ''} required />

                <label htmlFor="last_name">Last Name:</label>
                <input type="text" name="last_name" defaultValue={personal?.lastName ?? ''} required />

                <label htmlFor="position">Position:</label>
                <input type="text" name="position" defaultValue={personal?.position ?? ''} />

                <label htmlFor="summary">Summary:</label>
                <textarea name="summary" rows={3} defaultValue={personal?.summary ?? ''} />

                <label htmlFor="email">Email:</label>
                <input type="email" name="email" defaultValue={personal?.email ?? ''} />

                <label htmlFor="phone">Phone:</label>
                <input type="phone" name="phone" defaultValue={personal?.phone ?? ''} />

                <label htmlFor="city">City:</label>
                <input type="text" name="city" defaultValue={personal?.city ?? ''} />

                <label htmlFor="country">Country:</label>
                <input type="text" name="country" defaultValue={personal?.country ?? ''} />

                <button type="submit">Save</button>
            </form>
        </div>
    );
}