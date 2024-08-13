"use client"

import { sortByLatestCreated } from "@/util/sort";
import { ListButton, ListDivider } from "../list";
import { Resume } from "@prisma/client";
import { getDisplayDateFromDate } from "@/util/date";
import { deleteResume } from "@/lib/client/resume";
import { useRouter } from "next/navigation";

export default function ListResumes({ resumes }: { resumes: Resume[]|null }) {
    const { push } = useRouter();
    if (!resumes || !resumes.length) return

    return (
        <div className="rounded-lg bg-white mx-1 mt-2 mb-1 text-gray-700 divide-y divide-slate-400/20 ring-1 ring-slate-700/10 dark:bg-slate-800 dark:text-white dark:ring-slate-700">
            {resumes.sort(sortByLatestCreated).map(resume => (
                <div key={resume.id} className="relative flex flex-wrap items-center p-3">
                    <div className="flex-none">
                        <div>{resume.id}</div>
                        <div className="text-xs mt-1">
                            {getDisplayDateFromDate(resume.createdAt)}
                        </div>
                    </div>
                    <span className="ml-auto flex font-medium">
                        <ListButton type="edit" onClick={() => push(`/resume/${resume.id}/personal`)}/>
                        <ListDivider />
                        <ListButton type="delete" onClick={async() => deleteResume(resume.id)}/>
                    </span>
                </div>
            ))}
        </div>
    )
}