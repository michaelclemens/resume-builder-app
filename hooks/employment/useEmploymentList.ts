import { deleteEmployment, EmploymentWithHistory, setSortOrders } from "@/lib/client/employment";
import { fetchEmployments, removeEmployment, selectEmployment, setEmployments } from "@/lib/redux/reducers/employment";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";

const useEmploymentList = () => {
    const { employments, loading } = useAppSelector(selectEmployment);
    const dispatch = useAppDispatch();

    const fetch = (resumeId: string) => {
        dispatch(fetchEmployments(resumeId));
    }

    const remove = async(employment: EmploymentWithHistory) => {
        await deleteEmployment(employment.id);
        dispatch(removeEmployment(employment.id));
    }

    const saveSortOrder = async(employments: EmploymentWithHistory[]) => {
        dispatch(setEmployments(employments));
        await setSortOrders(employments);
    }

    return { employments: employments && [...employments], loading, fetch, remove, saveSortOrder }
}

export default useEmploymentList;