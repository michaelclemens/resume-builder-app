import { addEducation, deleteEducation, setSortOrders, updateEducation } from "@/lib/client/education";
import { fetchEducations, removeEducation, selectEducation, setEducation, clear, setEducations } from "@/lib/redux/reducers/education";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { Education } from "@prisma/client";

const useEducation = () => {
    const { educations, loading, error } = useAppSelector(selectEducation);
    const dispatch = useAppDispatch();

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

    return { educations, loading, error, fetch, set, save, remove, saveSortOrder, reset }
}

export default useEducation;