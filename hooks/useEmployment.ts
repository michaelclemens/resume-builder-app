import { addEmployment, deleteEmployment, EmploymentWithHistory, setSortOrders, updateEmployment } from "@/lib/client/employment";
import { fetchEmployments, removeEmployment, selectEmployment, setEmployment, clear, setEmployments } from "@/lib/redux/reducers/employment";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { useEffect } from "react";

const useEmployment = (initialEmployments?: EmploymentWithHistory[]) => {
    const { employments, loading, error } = useAppSelector(selectEmployment);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!employments && initialEmployments) {
            set(initialEmployments)
        }
        return () => reset()
    }, []);

    const fetch = (resumeId: string) => dispatch(fetchEmployments(resumeId))

    const set = (employments: EmploymentWithHistory[]) => dispatch(setEmployments(employments))
    
    const save = async(resumeId: string, formData: FormData, employmentId?: string) => {
        let employment = null;
        if (employmentId) {
            employment = await updateEmployment(employmentId, resumeId, formData);
        } else {
            employment = await addEmployment(resumeId, formData);
        }

        dispatch(setEmployment(employment))
    }

    const remove = async(employment: EmploymentWithHistory) => {
        await deleteEmployment(employment.id);
        dispatch(removeEmployment(employment.id))
    }

    const saveSortOrder = async(employments: EmploymentWithHistory[]) => {
        set(employments);
        await setSortOrders(employments);
    }

    const reset = () => { dispatch(clear()) }

    return { employments: employments ? [...employments] : [...initialEmployments ?? []], save, remove, saveSortOrder }
}

export default useEmployment;