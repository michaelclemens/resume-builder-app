import ListStrengths from "./ListStrengths";
import FormStrength from "./FormStrength";

export default function StrengthSection({ resumeId }: { resumeId: string }) {
    return (
        <>
            <ListStrengths resumeId={resumeId} />
            <FormStrength resumeId={resumeId} />
        </>
    )
}