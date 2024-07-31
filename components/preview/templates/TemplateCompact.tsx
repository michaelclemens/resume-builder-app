import { ResumeFull } from "@/lib/client/resume"
import { Details, Education, EmploymentHistory, Experience, Profile, Strengths } from "./compact";
import { Lato, Oswald } from "next/font/google";
import { forwardRef, Ref } from "react";

const oswald = Oswald({ subsets: ['latin'], display: 'swap' });
const lato = Lato({ weight: ['400', '700'], subsets: ['latin']});

export default forwardRef(({ resume: { personal, employments, educations, skills, strengths }}: { resume: ResumeFull }, ref: Ref<HTMLInputElement>) => (
    <div ref={ref} className={`flex flex-col bg-white text-[8pt] ${lato.className}`}>
        <div className="flex gap-x-10 min-h-screen h-full">
            <div className="w-4/6 pl-14 pt-16 bg-white pb-5">
                <div className="mb-7">
                    <div className={`mb-2 text-3xl font-medium ${oswald.className}`}>{personal?.firstName} {personal?.lastName}</div>
                    <div className={"text-[6.5pt] uppercase tracking-widest"}>{personal?.position}</div>
                </div>
                <Profile personal={personal} oswaldClassName={oswald.className}/>
                <EmploymentHistory employments={employments} oswaldClassName={oswald.className} />
                <Education educations={educations} oswaldClassName={oswald.className} />
            </div>
            <div className="w-2/6 px-10 pt-36 bg-[#082A4D] text-white pb-5">
                <Details personal={personal} oswaldClassName={oswald.className} />
                <Experience skills={skills} oswaldClassName={oswald.className} />
                <Strengths strengths={strengths} oswaldClassName={oswald.className} />
            </div>
        </div>
    </div>
))