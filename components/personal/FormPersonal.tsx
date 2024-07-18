"use client"

import Loading from "@/app/loading";
import usePersonal from "@/hooks/usePersonal";
import { Resume } from "@prisma/client";
import { FormEvent, useEffect } from "react";
import RichTextEditor from "../RichTextEditor";

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
            <h1 className="text-xl pb-1 border-b font-semibold mb-1">Personal</h1>
            <form onSubmit={onSubmit}>
                <label htmlFor="first_name">First Name:</label>
                <input type="text" name="first_name" defaultValue={personal?.firstName ?? ''} required />

                <label htmlFor="last_name">Last Name:</label>
                <input type="text" name="last_name" defaultValue={personal?.lastName ?? ''} required />

                <label htmlFor="position">Position:</label>
                <input type="text" name="position" defaultValue={personal?.position ?? ''} />

                <label htmlFor="summary">Summary:</label>
                <RichTextEditor name="summary" defaultValue={personal?.summary ?? ''} />

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