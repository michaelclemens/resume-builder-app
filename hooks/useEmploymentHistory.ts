import { addEmploymentHistory, deleteEmploymentHistory, updateEmploymentHistory } from "@/lib/client/employmentHistory";
import { removeEmploymentHistory, setEmploymentHistory } from "@/lib/redux/reducers/employment";
import { useAppDispatch } from "@/lib/redux/store";
import { EmploymentHistory } from "@prisma/client";

const useEmploymentHistory = () => {
    const dispatch = useAppDispatch();
    
    const save = async(employmentId: string, formData: FormData, historyId?: string) => {
        let history = null;
        if (historyId) {
            history = await updateEmploymentHistory(historyId, employmentId, formData);
        } else {
            history = await addEmploymentHistory(employmentId, formData);
        }

        dispatch(setEmploymentHistory(history))
    }

    const remove = async(history: EmploymentHistory) => {
        await deleteEmploymentHistory(history.id);
        dispatch(removeEmploymentHistory({ id: history.id, employmentId: history.employmentId}))
    }

    return { save, remove }
}

export default useEmploymentHistory;