import { addEducation, deleteEducation, setSortOrders, updateEducation } from "@/lib/client/education";
import { fetchEducations, removeEducation, selectEducation, setEducation, clear, setEducations } from "@/lib/redux/reducers/education";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { Education, Resume } from "@prisma/client";

const useEducation = () => {
    const { educations: [...educations], loading, error } = useAppSelector(selectEducation);
    const dispatch = useAppDispatch();

    const fetch = (resume: Resume) => { dispatch(fetchEducations(resume)) }
    
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

    const saveSortOrder = async(items: Education[]) => {
        dispatch(setEducations(items))
        await setSortOrders(items);
    }

    const reset = () => { dispatch(clear()) }

    return { educations, loading, error, fetch, save, remove, saveSortOrder, reset }
}

export default useEducation;