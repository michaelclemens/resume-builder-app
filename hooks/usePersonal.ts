import { addPersonal, updatePersonal } from "@/lib/client/personal";
import { fetchPersonal, clear, selectPersonal, setPersonal } from "@/lib/redux/reducers/personal";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { Resume } from "@prisma/client";

const usePersonal = () => {
    const { personal, loading, error } = useAppSelector(selectPersonal);
    const dispatch = useAppDispatch();

    const fetch = async(resume: Resume) => {
        await dispatch(fetchPersonal(resume));
    }
    
    const save = async(resume: Resume, formData: FormData, personalId?: string) => {
        let personal = null;
        if (personalId) {
            personal = await updatePersonal(personalId, resume.id, formData);
        } else {
            personal = await addPersonal(resume.id, formData);
        }

        dispatch(setPersonal(personal))
    }

    const reset = () => {
        dispatch(clear());
    }

    return { personal, loading, error, fetch, save, reset }
}

export default usePersonal;