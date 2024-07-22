import { addEmployment, deleteEmployment, setSortOrders, updateEmployment } from "@/lib/client/employment";
import { fetchEmployments, removeEmployment, selectEmployment, setEmployment, clear, setEmployments } from "@/lib/redux/reducers/employment";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { Employment } from "@prisma/client";

const useEmployment = () => {
    const { employments: [...employments], loading, error } = useAppSelector(selectEmployment);
    const dispatch = useAppDispatch();

    const fetch = (resumeId: string) => { dispatch(fetchEmployments(resumeId)) }
    
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

    const saveSortOrder = async(items: Employment[]) => {
        dispatch(setEmployments(items))
        await setSortOrders(items);
    }

    const reset = () => { dispatch(clear()) }

    return { employments, loading, error, fetch, save, remove, saveSortOrder, reset }
}

export default useEmployment;