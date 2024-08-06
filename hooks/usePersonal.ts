import { getSection, SectionEnums } from "@/lib/redux/reducers/sections";
import { useAppSelector } from "@/lib/redux/store";
import { Personal } from "@prisma/client";

const usePersonal = (initialPersonal?: Personal|null) => {
    const { selectors } = getSection(SectionEnums.personal);
    const personal = useAppSelector(selectors.selectItem);
    return { personal: personal ?? initialPersonal ?? null }
}

export default usePersonal;