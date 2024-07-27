import { addEmployment, updateEmployment } from "@/lib/client/employment";
import { setEmployment, selectEmploymentById } from "@/lib/redux/reducers/employment";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { ResponseStatus } from "@/lib/response";
import { EmploymentSchema, EmploymentSchemaType } from "@/types/employment";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const useEmploymentForm = (employmentId?: string) => {
    const employment = employmentId ? useAppSelector(state => selectEmploymentById(state, employmentId)) : null;
    const form = useForm<EmploymentSchemaType>({
        resolver: zodResolver(EmploymentSchema),
        defaultValues: {
            employer: employment?.employer,
            city: employment?.city ?? undefined,
        }
    });
    const dispatch = useAppDispatch();
    
    const save = async(resumeId: string, formData: EmploymentSchemaType) => {
        const response = employment?.id ? await updateEmployment(employment.id, resumeId, formData) : await addEmployment(resumeId, formData);

        if (response.status === ResponseStatus.success) {
            dispatch(setEmployment(response.payload.employment));
        }

        return response;
    }

    return { employment, save, ...form }
}

export default useEmploymentForm;