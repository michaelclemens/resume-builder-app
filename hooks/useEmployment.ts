import { addEmployment, deleteEmployment, updateEmployment } from "@/lib/client/employment";
import { fetchEmployments, removeEmployment, selectEmployment, setEmployment, clear } from "@/lib/redux/reducers/employment";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { Employment, Resume } from "@prisma/client";

const useEmployment = () => {
    const { employments: [...employments], loading, error } = useAppSelector(selectEmployment);
    const dispatch = useAppDispatch();

    const fetch = (resume: Resume) => { dispatch(fetchEmployments(resume)) }
    
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

    const reset = () => { dispatch(clear()) }

    return { employments, loading, error, fetch, save, remove, reset }
}

export default useEmployment;