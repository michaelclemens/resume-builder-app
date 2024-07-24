"use client"

import { sortByOrder } from "@/util/sort";
import { RenderHtml } from "@/components/util";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { ResumeFull } from "@/lib/client/resume";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { FaPrint } from "react-icons/fa";
import { useEducation, useEmployment, usePersonal, useSkill, useStrength } from "@/hooks";

export default function ResumePreview({ resume: resume }: { resume: ResumeFull }) {
    const { personal } = usePersonal(resume.personal ?? undefined);
    const { employments } = useEmployment(resume.employments);
    const { educations } = useEducation(resume.educations);
    const { skills } = useSkill(resume.skills);
    const { strengths } = useStrength(resume.strengths);

    const [animationParent] = useAutoAnimate();
    const componentRef = useRef(null);

    const documentTitle = `${personal ? `${personal.firstName}-${personal.lastName}` : 'My'}-CV.pdf`;

    const handlePrint = useReactToPrint({
        documentTitle,
        content: () => componentRef.current
    });

    return (
        <>
            <div className="absolute top-10 right-24">
                <button onClick={handlePrint} className="fixed bg-gray-500 rounded-md px-2 py-2 ring-1 shadow-sm ring-gray-800/10 text-gray-800 transition-colors duration-500 hover:bg-gray-400" title="Print">
                    <FaPrint size="1.75em"/>
                </button>
            </div>
            <div className="mx-auto my-10 w-[210mm]">
                <div className="flex gap-x-10 bg-white p-[1cm] print:p-0 text-[7.5pt] min-h-screen" ref={componentRef}>
                    <div className="w-2/6">
                        {personal && (
                            <>
                                <h3 className="text-xl pb-1 border-b font-semibold">Details</h3>
                                <ul className="mt-2 mb-10">
                                    {(personal?.city || personal?.country) && (
                                        <li className="px-2 mt-1">
                                            <strong>Address</strong>
                                            {personal?.city && <span className="block">{personal?.city}</span>}
                                            {personal?.country && <span className="block">{personal?.country}</span>}
                                        </li>
                                    )}
                                    {personal?.phone && (
                                        <li className="px-2 mt-1">
                                            <strong>Phone</strong>
                                            <span className="block">{personal?.phone}</span>
                                        </li>
                                    )}
                                    {personal?.email && (
                                        <li className="px-2 mt-1">
                                            <strong>Email</strong>
                                            <span className="block">{personal?.email}</span>
                                        </li>
                                    )}
                                </ul>
                                
                                {skills && skills.length > 0 && (
                                    <>
                                        <h3 className="text-xl pb-1 border-b font-semibold">Experience</h3>
                                        <ul ref={animationParent} className="mt-2 mb-10">
                                            {skills.sort(sortByOrder).map(skill => <li key={skill.id} className="px-2 mt-1">{skill.name}</li>)}
                                        </ul>
                                    </>
                                )}

                                {strengths && strengths.length > 0 && (
                                    <>
                                        <h3 className="text-xl pb-1 border-b font-semibold">Strengths</h3>
                                        <ul ref={animationParent} className="mt-2 mb-10">
                                            {strengths.sort(sortByOrder).map(strength => <li key={strength.id} className="px-2 mt-1">{strength.name}</li>)}
                                        </ul>
                                    </>
                                )}
                            </>
                        )}
                        
                    </div>
                    <div className="w-4/6">
                        {personal && (
                            <>
                                <h2 className="text-2xl pb-1 border-b font-semibold">Profile</h2>
                                <div className="mt-4">
                                    <RenderHtml html={personal?.summary ?? ''} />
                                </div>
                            </>
                        )}
                    
                        {employments && employments.length > 0 && (
                            <>
                                <h2 className="text-2xl mt-6 pb-1 border-b font-semibold">Employment History</h2>
                                <ul ref={animationParent} className="mt-2">
                                    {employments.sort(sortByOrder).map(employment => (
                                        <li key={employment.id} className="pt-2">
                                            <p className="flex justify-between text-sm">
                                                <strong className="text-base">{employment.employer}</strong>
                                                {employment.city}
                                            </p>
                                            
                                            {(employment.history && employment.history.length) && (
                                                <ul ref={animationParent} className="mt-2">
                                                    {[...employment.history].sort(sortByOrder).map(history => (
                                                        <li key={history.id} className="pt-2">
                                                            <p className="flex justify-between text-base">{history.title}</p>
                                                            <p className="text-justify text-xs">
                                                                {new Date(history.startDate).toDateString()}
                                                                {history.endDate && ` - ${new Date(history.endDate).toDateString()}`}
                                                            </p>
                                                            {history.description && <div className="text-justify"><RenderHtml html={history.description ?? ''} /></div>}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}

                        {educations && educations.length > 0 && (
                            <>
                                <h2 className="text-2xl mt-6 pb-1 border-b font-semibold">Education</h2>
                                <ul ref={animationParent} className="mt-2">
                                    {educations.sort(sortByOrder).map(education => (
                                        <li key={education.id} className="pt-2">
                                            <p className="flex justify-between text-sm">
                                                <strong className="text-base">{education.degree}, {education.school}</strong>
                                                {education.city}
                                            </p>
                                            <p className="text-justify text-xs">
                                                {new Date(education.startDate).toDateString()}
                                                {education.endDate && ` - ${new Date(education.endDate).toDateString()}`}
                                            </p>
                                            {education.description && <div className="text-justify"><RenderHtml html={education.description ?? ''} /></div>}
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}