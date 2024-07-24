import { addEducation, deleteEducation, setSortOrders, updateEducation } from "@/lib/client/education";
import { fetchEducations, removeEducation, selectEducation, setEducation, clear, setEducations } from "@/lib/redux/reducers/education";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { Education } from "@prisma/client";
import { useEffect } from "react";

const useEducation = (initialEducations?: Education[]) => {
    const { educations, loading, error } = useAppSelector(selectEducation);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!educations && initialEducations) {
            set(initialEducations)
        }
        return () => reset()
    }, []);

    const fetch = (resumeId: string) => dispatch(fetchEducations(resumeId))

    const set = (educations: Education[]) => dispatch(setEducations(educations))
    
    const save = async(resumeId: string, formData: FormData, educationId?: string) => {
        let education = null;
        if (educationId) {
            education = await updateEducation(educationId, resumeId, formData);
        } else {
            education = await addEducation(resumeId, formData);
        }

        dispatch(setEducation(education))
    }

    const remove = async(education: Education) => {
        await deleteEducation(education.id);
        dispatch(removeEducation(education.id))
    }

    const saveSortOrder = async(educations: Education[]) => {
        set(educations)
        await setSortOrders(educations);
    }

    const reset = () => { dispatch(clear()) }

    return { educations: educations ? [...educations] : [...initialEducations ?? []], save, remove, saveSortOrder }
}

export default useEducation;