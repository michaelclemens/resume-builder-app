"use client"

import { addPersonal, updatePersonal } from "@/lib/client/personal";
import { setPersonal } from "@/lib/redux/reducers/resume";
import { useAppDispatch } from "@/lib/redux/store";
import { Personal } from "@prisma/client";

export default function FormPersonal({ resumeId, personal }: { resumeId: string, personal?: Personal }) {
    const dispatch = useAppDispatch();

    async function submitFormAction(formData: FormData) {
        let newPersonal = null;
        if (personal?.id) {
            newPersonal = await updatePersonal(personal.id, personal.resumeId, formData);
            
        } else {
            newPersonal = await addPersonal(resumeId, formData);
        }

        dispatch(setPersonal(newPersonal))
    }

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