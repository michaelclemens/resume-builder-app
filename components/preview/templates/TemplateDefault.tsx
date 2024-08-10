import { ResumeFull } from "@/lib/client/resume"
import { Details, Education, Employment, Experience, Header, Profile, Strengths } from "./default";
import { Montserrat } from "next/font/google";
import ColourPicker from "../ColourPicker";
import { ColourElements, ColourElementType, TemplateOptions } from "@/types/template";

const montserrat = Montserrat({ subsets: ['latin'], display: 'swap' });
const defaults = {[ColourElements.background]: '#f4f4f4', [ColourElements.text]: '#000'};

export default function TemplateDefault(
    { resume: { templateOptions, personal, employments, educations, skills, strengths }, onColourChange, onResetToDefault}:
    { resume: ResumeFull, onColourChange: (type: ColourElementType, colour: string) => Promise<void>, onResetToDefault: () => Promise<void> }
) {
    return (
        <div className={`flex flex-col bg-white text-[6.5pt] min-h-screen h-full ${montserrat.className}`}>
            <Header personal={personal} />
            <div className="flex gap-x-7 min-h-screen h-full">      
                <ColourPicker 
                    templateOptions={templateOptions as TemplateOptions} 
                    defaults={defaults}
                    align="left"
                    className="w-2/6 pl-14 pr-7 pt-52"
                    onColourChange={onColourChange}
                    onResetToDefault={onResetToDefault}
                >
                    <Details personal={personal} />
                    <Experience skills={skills} />
                    <Strengths strengths={strengths} />
                </ColourPicker>
                <div className="w-4/6 pr-14 pt-52 bg-white pb-5">
                    <Profile personal={personal} />
                    <Employment employments={employments} />
                    <Education educations={educations} />
                </div>
            </div>
        </div>
    )
}