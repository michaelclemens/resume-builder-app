import { clear as clearPersonal } from "@/lib/redux/reducers/personal";
import { clear as clearEmployments } from "@/lib/redux/reducers/employment";
import { clear as clearEducations } from "@/lib/redux/reducers/education";
import { clear as clearSkills } from "@/lib/redux/reducers/skill";
import { clear as clearStrengths } from "@/lib/redux/reducers/strength";
import { useAppDispatch } from "@/lib/redux/store";

export default function useResume() {
    const dispatch = useAppDispatch();
    
    const resetAllState = () => {
        dispatch(clearPersonal())
        dispatch(clearEmployments())
        dispatch(clearEducations())
        dispatch(clearSkills())
        dispatch(clearStrengths())
    }

    return { resetAllState }
}