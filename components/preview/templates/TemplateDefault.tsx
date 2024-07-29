import { ResumeFull } from "@/lib/client/resume"
import { Details, Education, EmploymentHistory, Experience, Profile, Strengths } from "./default";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ['latin'], display: 'swap' });

export default ({ resume: { personal, employments, educations, skills, strengths }}: { resume: ResumeFull }) => (
    <div className={`flex bg-white text-[6.5pt] min-h-screen ${montserrat.className}`}>
        <div className="relative flex gap-x-7">
            <div className="absolute translate-x-1/2 translate-y-10 px-16 py-10 text-center uppercase bg-white ring-1 ring-black">
                <div className="mb-1 text-2xl font-bold tracking-widest">{personal?.firstName} {personal?.lastName}</div>
                <div className="text-sm">{personal?.position}</div>
            </div>
            <div className="w-2/6 pl-14 pr-7 bg-[#F4F4F4] pt-52">
                <Details personal={personal} />
                <Experience skills={skills} />
                <Strengths strengths={strengths} />
            </div>
            <div className="w-4/6 pr-14 pt-52">
                <Profile personal={personal} />
                <EmploymentHistory employments={employments} />
                <Education educations={educations} />
            </div>
        </div>
    </div>
)