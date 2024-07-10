import { addStrength, deleteStrength, updateStrength } from "@/lib/client/strength";
import { removeStrength, setStrength } from "@/lib/redux/reducers/resume";
import { useAppDispatch } from "@/lib/redux/store";
import { Strength } from "@prisma/client";

const useStrength = () => {
    const dispatch = useAppDispatch();
    
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

    return { save, remove }
}

export default useStrength;