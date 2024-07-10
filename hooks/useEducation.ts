import { addEducation, deleteEducation, updateEducation } from "@/lib/client/education";
import { removeEducation, setEducation } from "@/lib/redux/reducers/resume";
import { useAppDispatch } from "@/lib/redux/store";
import { Education } from "@prisma/client";

const useEducation = () => {
    const dispatch = useAppDispatch();
    
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

    return { save, remove }
}

export default useEducation;