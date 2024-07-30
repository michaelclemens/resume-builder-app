import { deleteEmploymentHistory, setSortOrders } from "@/lib/client/employmentHistory";
import { removeEmploymentHistory, selectEmploymentById, setEmploymentHistories } from "@/lib/redux/reducers/employment";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { EmploymentHistory } from "@prisma/client";

const useEmploymentHistoryList = (employmentId: string, initialHistories?: EmploymentHistory[]) => {
    const employment = useAppSelector(state => selectEmploymentById(state, employmentId));
    const dispatch = useAppDispatch();

    const remove = async(history: EmploymentHistory) => {
        await deleteEmploymentHistory(history.id);
        dispatch(removeEmploymentHistory({ id: history.id, employmentId: history.employmentId}))
    }

    const saveSortOrder = async(employmentId: string, items: EmploymentHistory[]) => {
        dispatch(setEmploymentHistories({ employmentId, items }));
        await setSortOrders(items);
    }

    return { histories: employment?.history ? [...employment.history] : [...initialHistories ?? []], remove, saveSortOrder }
}

export default useEmploymentHistoryList;