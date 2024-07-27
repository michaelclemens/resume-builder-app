import { addEmploymentHistory, updateEmploymentHistory } from "@/lib/client/employmentHistory";
import { selectEmploymentHistoryById, setEmploymentHistory } from "@/lib/redux/reducers/employment";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { ResponseStatus } from "@/lib/response";
import { EmploymentHistorySchema, EmploymentHistorySchemaType } from "@/types/employment";
import { getDisplayDateFromDate } from "@/util/date";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const useEmploymentHistoryForm = (employmentId: string, historyId?: string) => {
    const history = historyId ? useAppSelector(state => selectEmploymentHistoryById(state, employmentId, historyId)) : null;
    const form = useForm<EmploymentHistorySchemaType>({
        resolver: zodResolver(EmploymentHistorySchema),
        defaultValues: {
            title: history?.title,
            startDate: getDisplayDateFromDate(history?.startDate),
            endDate: history?.endDate ? getDisplayDateFromDate(history?.endDate) : undefined,
            description: history?.description ?? undefined,
        }
    });
    const dispatch = useAppDispatch();

    const save = async(employmentId: string, formData: EmploymentHistorySchemaType) => {
        const response = history?.id ? await updateEmploymentHistory(history.id, employmentId, formData) : await addEmploymentHistory(employmentId, formData);

        if (response.status === ResponseStatus.success) {
            dispatch(setEmploymentHistory(response.payload.history));
        }

        return response;
    }

    return { history, save, ...form }
}

export default useEmploymentHistoryForm;