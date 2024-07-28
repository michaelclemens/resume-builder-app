import { selectPersonal } from "@/lib/redux/reducers/personal";
import { useAppSelector } from "@/lib/redux/store";
import { Personal } from "@prisma/client";

const usePersonal = (initialPersonal?: Personal|null) => {
    const { personal } = useAppSelector(selectPersonal);    
    return { personal: personal ?? initialPersonal }
}

export default usePersonal;