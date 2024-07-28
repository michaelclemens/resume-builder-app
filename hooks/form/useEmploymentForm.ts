import { addEmployment, updateEmployment } from "@/lib/client/employment";
import { setEmployment } from "@/lib/redux/reducers/employment";
import { useAppDispatch } from "@/lib/redux/store";
import { ResponseStatus } from "@/lib/response";
import { EmploymentSchema, EmploymentSchemaType } from "@/types/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Employment } from "@prisma/client";
import { useForm } from "react-hook-form";

const useEmploymentForm = (employment?: Employment) => {
    const dispatch = useAppDispatch();
    const form = useForm<EmploymentSchemaType>({ resolver: zodResolver(EmploymentSchema), defaultValues: {
        employer: employment?.employer ?? '',
        city: employment?.city ?? '',
    }});
    
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