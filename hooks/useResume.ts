import { fetchResume, clear, selectResume } from "@/lib/redux/reducers/resume";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";

const useResume = () => {
    const { resume, loading, error } = useAppSelector(selectResume);
    const dispatch = useAppDispatch();

    const fetch = (id: string) => { dispatch(fetchResume(id)) }
    
    const reset = () => { dispatch(clear()) }

    return { resume, loading, error, fetch, reset }
}

export default useResume;