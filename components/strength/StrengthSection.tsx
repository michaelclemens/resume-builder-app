import ListStrengths from "./ListStrengths";
import FormStrength from "./FormStrength";
import { Strength } from "@prisma/client";

export default function StrengthSection({ resumeId, strengths }: { resumeId: string, strengths: Strength[] }) {
    return (
        <>
            <ListStrengths strengths={strengths} />
            <FormStrength resumeId={resumeId} />
        </>
    )
}