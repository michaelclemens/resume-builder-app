import { addPersonal, updatePersonal } from "@/lib/client/personal";
import { fetchPersonal, selectPersonal, setPersonal } from "@/lib/redux/reducers/personal";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { ResponseStatus } from "@/lib/response";
import { PersonalSchema, PersonalSchemaType } from "@/types/personal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const usePersonalForm = (resumeId: string) => {
    const { personal, loading } = useAppSelector(selectPersonal);
    const dispatch = useAppDispatch();

    const fetch = async (resumeId: string) => {
        return await dispatch(fetchPersonal(resumeId)).unwrap();
    }

    const getDefaultValues = async () => {
        const initialPersonal = await fetch(resumeId);
        return ({
            firstName: initialPersonal?.firstName ?? '',
            lastName: initialPersonal?.lastName ?? '',
            position: initialPersonal?.position ?? '',
            summary: initialPersonal?.summary ?? '',
            email: initialPersonal?.email ?? '',
            phone: initialPersonal?.phone ?? '',
            city: initialPersonal?.city ?? '',
            country: initialPersonal?.country ?? ''
        })
    }

    const form = useForm<PersonalSchemaType>({ resolver: zodResolver(PersonalSchema), defaultValues: getDefaultValues});
    
    const save = async(resumeId: string, formData: PersonalSchemaType) => {
        const response = personal?.id ? await updatePersonal(personal.id, resumeId, formData) : await addPersonal(resumeId, formData);

        if (response.status === ResponseStatus.success) {
            dispatch(setPersonal(response.payload.personal));
        }

        return response;
    }

    return { personal, loading, save, ...form }
}

export default usePersonalForm;