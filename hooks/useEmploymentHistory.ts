import { addEmploymentHistory, deleteEmploymentHistory, setSortOrders, updateEmploymentHistory } from "@/lib/client/employmentHistory";
import { removeEmploymentHistory, setEmploymentHistories, setEmploymentHistory } from "@/lib/redux/reducers/employment";
import { useAppDispatch } from "@/lib/redux/store";
import { Employment, EmploymentHistory } from "@prisma/client";

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

    const saveSortOrder = async(employmentId: string, items: EmploymentHistory[]) => {
        dispatch(setEmploymentHistories({ employmentId, items }));
        await setSortOrders(items);
    }

    return { save, remove, saveSortOrder }
}

export default useEmploymentHistory;