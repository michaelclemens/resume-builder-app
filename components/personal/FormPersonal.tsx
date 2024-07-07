"use client"

import { addPersonal, updatePersonal } from "@/lib/client/personal";
import { Personal } from "@prisma/client";

export default function FormPersonal({ resumeId, personal }: { resumeId: string, personal?: Personal }) {
    async function submitFormAction(formData: FormData) {
        if (personal?.id) {
            await updatePersonal(personal?.id, resumeId, formData);
        } else {
            await addPersonal(resumeId, formData);
        }
    }

    return (
        <div>
            <form action={submitFormAction}>
                <label htmlFor="position">Position:</label>
                <input type="text" name="position" defaultValue={personal?.position ?? ''} required />

                <label htmlFor="first_name">First Name:</label>
                <input type="text" name="first_name" defaultValue={personal?.firstName ?? ''} required />

                <label htmlFor="last_name">Last Name:</label>
                <input type="text" name="last_name" defaultValue={personal?.lastName ?? ''} required />

                <label htmlFor="email">Email:</label>
                <input type="email" name="email" defaultValue={personal?.email ?? ''} required />

                <label htmlFor="phone">Phone:</label>
                <input type="phone" name="phone" defaultValue={personal?.phone ?? ''} required />

                <label htmlFor="city">City:</label>
                <input type="text" name="city" defaultValue={personal?.city ?? ''} required />

                <label htmlFor="country">Country:</label>
                <input type="text" name="country" defaultValue={personal?.country ?? ''} required />

                <button type="submit">Save</button>
            </form>
        </div>
    );
}