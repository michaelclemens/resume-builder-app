import { deleteEmployment, EmploymentWithHistory, setSortOrders } from "@/lib/client/employment";
import { removeEmployment, selectEmployment, setEmployments } from "@/lib/redux/reducers/employment";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";

const useEmploymentList = (initialEmployments?: EmploymentWithHistory[]) => {
    const { employments, loading } = useAppSelector(selectEmployment);
    const dispatch = useAppDispatch();

    const remove = async(employment: EmploymentWithHistory) => {
        await deleteEmployment(employment.id);
        dispatch(removeEmployment(employment.id));
    }

    const saveSortOrder = async(employments: EmploymentWithHistory[]) => {
        dispatch(setEmployments(employments));
        await setSortOrders(employments);
    }

    return { employments: employments ? [...employments] : initialEmployments ?? [], loading, remove, saveSortOrder }
}

export default useEmploymentList;