"use client"

import { addPersonal, updatePersonal } from "@/lib/client/personal";
import { fetchPersonal, clear, selectPersonal, setPersonal } from "@/lib/redux/reducers/personal";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";

const usePersonal = () => {
    const { personal, loading, error } = useAppSelector(selectPersonal);
    const dispatch = useAppDispatch();

    const fetch = async(resumeId: string) => {
        await dispatch(fetchPersonal(resumeId));
    }
    
    const save = async(resumeId: string, formData: FormData, personalId?: string) => {
        let personal = null;
        if (personalId) {
            personal = await updatePersonal(personalId, resumeId, formData);
        } else {
            personal = await addPersonal(resumeId, formData);
        }

        dispatch(setPersonal(personal))
    }

    const reset = () => {
        dispatch(clear());
    }

    return { personal, loading, error, fetch, save, reset }
}

export default usePersonal;