import { addStrength, deleteStrength, updateStrength } from "@/lib/client/strength";
import { fetchStrengths, removeStrength, selectStrength, setStrength, clear } from "@/lib/redux/reducers/strength";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { Resume, Strength } from "@prisma/client";

const useStrength = () => {
    const { strengths, loading, error } = useAppSelector(selectStrength);
    const dispatch = useAppDispatch();

    const fetch = (resume: Resume) => { dispatch(fetchStrengths(resume)) }
    
    const save = async(resumeId: string, formData: FormData, strengthId?: string) => {
        let strength = null;
        if (strengthId) {
            strength = await updateStrength(strengthId, resumeId, formData);
        } else {
            strength = await addStrength(resumeId, formData);
        }

        dispatch(setStrength(strength))
    }

    const remove = async(strength: Strength) => {
        await deleteStrength(strength.id);
        dispatch(removeStrength(strength.id))
    }

    const reset = () => { dispatch(clear()) }

    return { strengths, loading, error, fetch, save, remove, reset }
}

export default useStrength;