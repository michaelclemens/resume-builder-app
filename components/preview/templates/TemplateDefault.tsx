import { ResumeFull } from "@/lib/client/resume"
import { Details, Education, EmploymentHistory, Experience, Profile, Strengths } from "./default";
import { Montserrat } from "next/font/google";
import { forwardRef, Ref } from "react";

const montserrat = Montserrat({ subsets: ['latin'], display: 'swap' });

export default forwardRef(({ resume: { personal, employments, educations, skills, strengths }}: { resume: ResumeFull }, ref: Ref<HTMLInputElement>) => (
    <div ref={ref} className={`flex flex-col bg-white text-[6.5pt] ${montserrat.className}`}>
        <div className="flex justify-center">
            <div className="absolute flex flex-col mt-10 px-16 py-10 text-center uppercase bg-white ring-1 ring-black">
                <div className="mb-1 text-2xl font-bold tracking-widest">{personal?.firstName} {personal?.lastName}</div>
                <div className="text-sm">{personal?.position}</div>
            </div>
        </div>
        <div className="flex gap-x-7 min-h-screen h-full">
            <div className="w-2/6 pl-14 pr-7 pt-52 bg-[#f4f4f4] pb-5">
                <Details personal={personal} />
                <Experience skills={skills} />
                <Strengths strengths={strengths} />
            </div>
            <div className="w-4/6 pr-14 pt-52 bg-white pb-5">
                <Profile personal={personal} />
                <EmploymentHistory employments={employments} />
                <Education educations={educations} />
            </div>
        </div>
    </div>
))