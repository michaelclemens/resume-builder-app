import { deleteEducation, setSortOrders } from "@/lib/client/education";
import { fetchEducations, removeEducation, selectEducation, setEducations } from "@/lib/redux/reducers/education";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { Education } from "@prisma/client";

const useEducationList = () => {
    const { educations, loading } = useAppSelector(selectEducation);
    const dispatch = useAppDispatch();

    const fetch = (resumeId: string) => {
         dispatch(fetchEducations(resumeId));
    }

    const remove = async(education: Education) => {
        await deleteEducation(education.id);
        dispatch(removeEducation(education.id));
    }

    const saveSortOrder = async(educations: Education[]) => {
        dispatch(setEducations(educations));
        await setSortOrders(educations);
    }

    return { educations: educations && [...educations], loading, fetch, remove, saveSortOrder }
}

export default useEducationList;