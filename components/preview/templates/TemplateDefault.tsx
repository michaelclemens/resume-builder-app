import { ResumeFull } from "@/lib/client/resume"
import { Details, Education, EmploymentHistory, Experience, Profile, Strengths } from "./default";

export default ({ resume: { personal, employments, educations, skills, strengths } }: { resume: ResumeFull }) => (
    <div className="flex bg-white text-[7.5pt] min-h-screen">
        <div className="flex gap-x-10 m-[1cm] print:m-0">
            <div className="w-2/6">
                <Details personal={personal} />
                <Experience skills={skills} />
                <Strengths strengths={strengths} />
            </div>
            <div className="w-4/6">
                <Profile personal={personal} />
                <EmploymentHistory employments={employments} />
                <Education educations={educations} />
            </div>
        </div>
    </div>
)