import { ResumeFull } from "@/lib/client/resume"
import { Details, Education, Employment, Experience, Header, Profile, Strengths } from "./compact";
import { Lato, Oswald } from "next/font/google";
import ColourPicker from "../ColourPicker";
import { ColourElements, ColourElementType, TemplateOptions } from "@/types/template";

const oswald = Oswald({ subsets: ['latin'], display: 'swap' });
const lato = Lato({ weight: ['400', '700'], subsets: ['latin']});
const defaults = {[ColourElements.background]: '#082A4D', [ColourElements.text]: '#fff'};

export default (
    { resume: { templateOptions, personal, employments, educations, skills, strengths }, onColourChange, onResetToDefault}: 
    { resume: ResumeFull, onColourChange: (type: ColourElementType, colour: string) => Promise<void>, onResetToDefault: () => Promise<void> }
) => (
    <div className={`flex flex-col bg-white min-h-screen h-full text-[8pt] ${lato.className}`}>
        <div className="flex gap-x-10 min-h-screen h-full">
            <div className="w-4/6 pl-14 pt-16 bg-white pb-5">
                <Header personal={personal} oswaldClassName={oswald.className} />
                <Profile personal={personal} oswaldClassName={oswald.className} />
                <Employment employments={employments} oswaldClassName={oswald.className} />
                <Education educations={educations} oswaldClassName={oswald.className} />
            </div>
            <ColourPicker 
                templateOptions={templateOptions as TemplateOptions} 
                defaults={defaults} 
                className="w-2/6 px-10 pt-36 text-white pb-5" 
                onColourChange={onColourChange}
                onResetToDefault={onResetToDefault}
            >
                <Details personal={personal} oswaldClassName={oswald.className} />
                <Experience skills={skills} oswaldClassName={oswald.className} />
                <Strengths strengths={strengths} oswaldClassName={oswald.className} />
            </ColourPicker>
        </div>
    </div>
)