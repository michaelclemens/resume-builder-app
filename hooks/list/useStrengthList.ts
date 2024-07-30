import { deleteStrength, setSortOrders } from "@/lib/client/strength";
import { removeStrength, selectStrengthList, setStrengths } from "@/lib/redux/reducers/strength";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { Strength } from "@prisma/client";

const useStrengthList = (initialStrengths?: Strength[]) => {
    const strengths = useAppSelector(selectStrengthList);
    const dispatch = useAppDispatch();

    const remove = async(strength: Strength) => {
        await deleteStrength(strength.id);
        dispatch(removeStrength(strength.id));
    }

    const saveSortOrder = async(strengths: Strength[]) => {
        dispatch(setStrengths(strengths));
        await setSortOrders(strengths);
    }

    return { strengths: strengths ? [...strengths] : initialStrengths ?? [], remove, saveSortOrder }
}

export default useStrengthList;