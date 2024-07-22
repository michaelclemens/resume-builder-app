import { addStrength, deleteStrength, setSortOrders, updateStrength } from "@/lib/client/strength";
import { fetchStrengths, removeStrength, selectStrength, setStrength, clear, setStrengths } from "@/lib/redux/reducers/strength";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { Strength } from "@prisma/client";

const useStrength = () => {
    const { strengths, loading, error } = useAppSelector(selectStrength);
    const dispatch = useAppDispatch();

    const fetch = (resumeId: string) => dispatch(fetchStrengths(resumeId))

    const set = (strengths: Strength[]) => dispatch(setStrengths(strengths))
    
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

    const saveSortOrder = async(strengths: Strength[]) => {
        set(strengths);
        await setSortOrders(strengths);
    }

    const reset = () => { dispatch(clear()) }

    return { strengths, loading, error, fetch, set, save, remove, saveSortOrder, reset }
}

export default useStrength;