import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { ResponseStatus } from "@/lib/response";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { selectEducationById, setEducation } from "@/lib/redux/reducers/education";
import { EducationSchema, EducationSchemaType } from "@/types/education";
import { addEducation, updateEducation } from "@/lib/client/education";
import { getDisplayDateFromDate } from "@/util/date";

const useEducationForm = (educationId?: string) => {
    const education = educationId ? useAppSelector(state => selectEducationById(state, educationId)) : null;
    const form = useForm<EducationSchemaType>({
        resolver: zodResolver(EducationSchema),
        defaultValues: {
            school: education?.school,
            degree: education?.degree,
            startDate: getDisplayDateFromDate(education?.startDate),
            endDate: education?.endDate ? getDisplayDateFromDate(education?.endDate) : undefined,
            city: education?.city ?? undefined,
            description: education?.description ?? undefined,
        }
    });
    const dispatch = useAppDispatch();
    
    const save = async(resumeId: string, formData: EducationSchemaType) => {
        const response = education?.id ? await updateEducation(education.id, resumeId, formData) : await addEducation(resumeId, formData);

        if (response.status === ResponseStatus.success) {
            dispatch(setEducation(response.payload.education));
        }

        return response;
    }

    return { education, save, ...form }
}

export default useEducationForm;