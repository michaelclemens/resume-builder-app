import { addStrength, deleteStrength, setSortOrders, updateStrength } from "@/lib/client/strength";
import { fetchStrengths, removeStrength, selectStrength, setStrength, clear, setStrengths } from "@/lib/redux/reducers/strength";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { Resume, Strength } from "@prisma/client";

const useStrength = () => {
    const { strengths: [...strengths], loading, error } = useAppSelector(selectStrength);
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

    const saveSortOrder = (items: Strength[]) => {
        const newItems = items.map((strength, index) => ({ ...strength, order: index + 1 }));
        setSortOrders(newItems);
        dispatch(setStrengths(newItems))
    }

    const reset = () => { dispatch(clear()) }

    return { strengths, loading, error, fetch, save, remove, saveSortOrder, reset }
}

export default useStrength;