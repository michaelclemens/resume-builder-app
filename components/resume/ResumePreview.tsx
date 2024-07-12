import Loading from "@/app/loading";
import { selectIsLoadingResume } from "@/lib/redux/reducers";
import { selectEducationList } from "@/lib/redux/reducers/education";
import { selectEmploymentList } from "@/lib/redux/reducers/employment";
import { selectPersonalDetails } from "@/lib/redux/reducers/personal";
import { selectSkillList } from "@/lib/redux/reducers/skill";
import { selectStrengthList } from "@/lib/redux/reducers/strength";
import { useAppSelector } from "@/lib/redux/store";
import { sortByOrder } from "@/util/sort";

export default function ResumePreview() {
    const personal = useAppSelector(selectPersonalDetails);
    const [...employments] = useAppSelector(selectEmploymentList);
    const [...educations] = useAppSelector(selectEducationList);
    const [...skills] = useAppSelector(selectSkillList);
    const [...strengths] = useAppSelector(selectStrengthList);

    const isLoading = useAppSelector(selectIsLoadingResume);

    if (isLoading) {
        return <Loading/>
    }

    return (
        <div className="p-5">
            <div className="flex gap-x-10">
                <div className="w-2/6">
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
                    
                    {skills.length > 0 && (
                        <>
                            <h3 className="text-xl pb-1 border-b font-semibold">Experience</h3>
                            <ul className="mt-2 mb-10">
                                {skills.sort(sortByOrder).map(skill => <li key={skill.id} className="px-2 mt-1">{skill.name}</li>)}
                            </ul>
                        </>
                    )}

                    {strengths.length > 0 && (
                        <>
                            <h3 className="text-xl pb-1 border-b font-semibold">Strengths</h3>
                            <ul className="mt-2 mb-10">
                                {strengths.sort(sortByOrder).map(strength => <li key={strength.id} className="px-2 mt-1">{strength.name}</li>)}
                            </ul>
                        </>
                    )}
                </div>
                <div className="w-4/6">
                    <h2 className="text-2xl pb-1 border-b font-semibold">Profile</h2>
                    <p className="mt-4">{personal?.summary}</p>
                    
                    {employments.length > 0 && (
                        <>
                            <h2 className="text-2xl mt-6 pb-1 border-b font-semibold">Employment History</h2>
                            <ul className="mt-2">
                                {employments.sort(sortByOrder).map(employment => (
                                    <li key={employment.id} className="pt-2">
                                        <p className="flex justify-between text-sm">
                                            <strong className="text-base">{employment.employer}</strong>
                                            {employment.city}
                                        </p>
                                        
                                        {(employment.history && employment.history.length) && (
                                            <ul className="mt-2">
                                                {[...employment.history].sort(sortByOrder).map(history => (
                                                    <li key={history.id} className="pt-2">
                                                        <p className="flex justify-between text-base">{history.title}</p>
                                                        <p className="text-justify text-xs">
                                                            {new Date(history.startDate).toDateString()}
                                                            {history.endDate && ` - ${new Date(history.endDate).toDateString()}`}
                                                        </p>
                                                        <p className="text-justify">{history.description}</p>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}

                    {educations.length > 0 && (
                        <>
                            <h2 className="text-2xl mt-6 pb-1 border-b font-semibold">Education</h2>
                            <ul className="mt-2">
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
                                        {education.description && <p className="text-justify">{education.description}</p>}
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}