import { deleteEducation, setSortOrders } from "@/lib/client/education";
import { removeEducation, selectEducation, setEducations } from "@/lib/redux/reducers/education";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { Education } from "@prisma/client";

const useEducationList = (initialEducations?: Education[]) => {
    const { educations, loading } = useAppSelector(selectEducation);
    const dispatch = useAppDispatch();

    const remove = async(education: Education) => {
        await deleteEducation(education.id);
        dispatch(removeEducation(education.id));
    }

    const saveSortOrder = async(educations: Education[]) => {
        dispatch(setEducations(educations));
        await setSortOrders(educations);
    }

    return { educations: educations ? [...educations] : initialEducations, loading, remove, saveSortOrder }
}

export default useEducationList;