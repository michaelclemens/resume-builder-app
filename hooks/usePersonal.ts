import { addPersonal, updatePersonal } from "@/lib/client/personal";
import { setPersonal } from "@/lib/redux/reducers/resume";
import { useAppDispatch } from "@/lib/redux/store";

const usePersonal = () => {
    const dispatch = useAppDispatch();
    
    const save = async(resumeId: string, formData: FormData, personalId?: string) => {
        let personal = null;
        if (personalId) {
            personal = await updatePersonal(personalId, resumeId, formData);
        } else {
            personal = await addPersonal(resumeId, formData);
        }

        dispatch(setPersonal(personal))
    }

    return { save }
}

export default usePersonal;