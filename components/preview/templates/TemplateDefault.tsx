import { ResumeFull } from "@/lib/client/resume"
import { Details, Education, Employment, Experience, Header, Profile, Strengths } from "./default";
import { Montserrat } from "next/font/google";
import { ColourElements } from "@/types/template";
import { getDefaultOptions } from "@/util/template";
import { Template } from "@prisma/client";

const montserrat = Montserrat({ subsets: ['latin'], display: 'swap', variable: '--font-montserrat' });

export default function TemplateDefault(
    { resume: { templateOptions, personal, employments, educations, skills, strengths }}:
    { resume: ResumeFull }
) {
    const defaults = getDefaultOptions(Template.DEFAULT);
    return (
        <div className={`${montserrat.variable} font-montserrat flex flex-col bg-white text-[6.5pt] min-h-screen h-full `}>
            <Header personal={personal} />
            <div className="flex gap-x-7 min-h-screen h-full">
                <div className="w-2/6 pl-14 pr-7 pt-52" style={{ 
                    backgroundColor: templateOptions?.colours?.[ColourElements.background] ?? defaults[ColourElements.background], 
                    color: templateOptions?.colours?.[ColourElements.text] ?? defaults[ColourElements.text] 
                }}> 
                    <Details personal={personal} />
                    <Experience skills={skills} />
                    <Strengths strengths={strengths} />
                </div>
                <div className="w-4/6 pr-14 pt-52 bg-white pb-5">
                    <Profile personal={personal} />
                    <Employment employments={employments} />
                    <Education educations={educations} />
                </div>
            </div>
        </div>
    )
}