import { addPersonal, updatePersonal } from "@/lib/client/personal";
import { fetchPersonal, clear, selectPersonal, setPersonal } from "@/lib/redux/reducers/personal";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { Personal } from "@prisma/client";
import { useEffect } from "react";

const usePersonal = (initialPersonal?: Personal) => {
    const { personal, loading, error } = useAppSelector(selectPersonal);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!personal && initialPersonal) {
            set(initialPersonal)
        }
        return () => reset()
    }, []);

    const fetch = async(resumeId: string) => {
        await dispatch(fetchPersonal(resumeId));
    }

    const set = (personal: Personal|null) => dispatch(setPersonal(personal));
    
    const save = async(resumeId: string, formData: FormData, personalId?: string) => {
        let personal = null;
        if (personalId) {
            personal = await updatePersonal(personalId, resumeId, formData);
        } else {
            personal = await addPersonal(resumeId, formData);
        }

        set(personal);
    }

    const reset = () => {
        dispatch(clear());
    }

    return { personal: personal ?? initialPersonal ?? null, save }
}

export default usePersonal;