import { addEmployment, deleteEmployment, updateEmployment } from "@/lib/client/employment";
import { removeEmployment, setEmployment } from "@/lib/redux/reducers/resume";
import { useAppDispatch } from "@/lib/redux/store";
import { Employment } from "@prisma/client";

const useEmployment = () => {
    const dispatch = useAppDispatch();
    
    const save = async(resumeId: string, formData: FormData, employmentId?: string) => {
        let employment = null;
        if (employmentId) {
            employment = await updateEmployment(employmentId, resumeId, formData);
        } else {
            employment = await addEmployment(resumeId, formData);
        }

        dispatch(setEmployment(employment))
    }

    const remove = async(employment: Employment) => {
        await deleteEmployment(employment.id);
        dispatch(removeEmployment(employment.id))
    }

    return { save, remove }
}

export default useEmployment;