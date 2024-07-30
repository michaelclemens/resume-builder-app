import { deleteEmployment, EmploymentWithHistory, setSortOrders } from "@/lib/client/employment";
import { removeEmployment, selectEmployment, setEmployments, clear } from "@/lib/redux/reducers/employment";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { useEffect } from "react";

const useEmploymentList = (initialEmployments?: EmploymentWithHistory[]) => {
    const { employments, loading } = useAppSelector(selectEmployment);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (initialEmployments && !employments) {
            console.log('setting employments...');
            dispatch(setEmployments(initialEmployments));
        }
    }, [initialEmployments])

    const remove = async(employment: EmploymentWithHistory) => {
        await deleteEmployment(employment.id);
        dispatch(removeEmployment(employment.id));
    }

    const saveSortOrder = async(employments: EmploymentWithHistory[]) => {
        dispatch(setEmployments(employments));
        await setSortOrders(employments);
    }

    return { employments: employments ? [...employments] : [...initialEmployments ?? []], loading, remove, saveSortOrder }
}

export default useEmploymentList;