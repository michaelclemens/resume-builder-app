import { deleteStrength, setSortOrders } from "@/lib/client/strength";
import { fetchStrengths, removeStrength, selectStrength, setStrengths } from "@/lib/redux/reducers/strength";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { Strength } from "@prisma/client";

const useStrengthList = () => {
    const { strengths, loading } = useAppSelector(selectStrength);
    const dispatch = useAppDispatch();

    const fetch = (resumeId: string) => {
        dispatch(fetchStrengths(resumeId));
    }

    const remove = async(strength: Strength) => {
        await deleteStrength(strength.id);
        dispatch(removeStrength(strength.id));
    }

    const saveSortOrder = async(strengths: Strength[]) => {
        dispatch(setStrengths(strengths));
        await setSortOrders(strengths);
    }

    return { strengths: strengths && [...strengths], loading, fetch, remove, saveSortOrder }
}

export default useStrengthList;