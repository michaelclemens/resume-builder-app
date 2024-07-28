import { addPersonal, updatePersonal } from "@/lib/client/personal";
import { setPersonal } from "@/lib/redux/reducers/personal";
import { useAppDispatch } from "@/lib/redux/store";
import { ResponseStatus } from "@/lib/response";
import { PersonalSchema, PersonalSchemaType } from "@/types/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Personal } from "@prisma/client";
import { useForm } from "react-hook-form";

const usePersonalForm = (personal?: Personal) => {
    const dispatch = useAppDispatch();

    const form = useForm<PersonalSchemaType>({ resolver: zodResolver(PersonalSchema), defaultValues: {
        firstName: personal?.firstName ?? '',
        lastName: personal?.lastName ?? '',
        position: personal?.position ?? '',
        summary: personal?.summary ?? '',
        email: personal?.email ?? '',
        phone: personal?.phone ?? '',
        city: personal?.city ?? '',
        country: personal?.country ?? ''
    }});
    
    const save = async(resumeId: string, formData: PersonalSchemaType) => {
        const response = personal?.id ? await updatePersonal(personal.id, resumeId, formData) : await addPersonal(resumeId, formData);

        if (response.status === ResponseStatus.success) {
            dispatch(setPersonal(response.payload.personal));
        }

        return response;
    }

    return { personal, save, ...form }
}

export default usePersonalForm;