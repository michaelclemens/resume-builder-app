import ListStrengths from "./ListStrengths";
import FormStrength from "./FormStrength";
import { Strength } from "@prisma/client";

export default function StrengthSection({ resumeId, initialStrengths }: { resumeId: string, initialStrengths?: Strength[] }) {    
    return (
        <>
            <ListStrengths initialStrengths={initialStrengths} />
            <FormStrength resumeId={resumeId} />
        </>
    )
}