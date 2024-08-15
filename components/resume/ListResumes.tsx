"use client"

import { sortByLatestCreated } from "@/util/sort";
import { ListButton } from "../list";
import { Resume } from "@prisma/client";
import { deleteResume } from "@/lib/client/resume";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ListResumes({ resumes }: { resumes: Resume[]|null }) {
    const { push } = useRouter();
    if (!resumes || !resumes.length) return

    return (
        <div className="flex gap-6 rounded-lg p-5 mx-auto items-center overflow-x-auto overflow-y-hidden backdrop-blur-sm shadow-md text-white ring-1 ring-slate-300/60 dark:ring-slate-400/20 ">
            {resumes.sort(sortByLatestCreated).map(resume => (
                <div key={resume.id} className="shrink-0">
                    <div className="text-sm text-center mb-2">
                        {resume.createdAt.toLocaleString("en-GB")}
                    </div>
                    <div onClick={() => push(`/resume/${resume.id}/personal`)} className="cursor-pointer">
                        <Image 
                            className="brightness-75 hover:brightness-100 w-[160px] h-[208px] transition-all duration-500"
                            src={`/templates/${resume.template.toLowerCase()}.png`}
                            width={160}
                            height={208}
                            alt={"Edit Resume"}
                        />
                    </div>
             
                    <div className="text-center mt-2">
                        <ListButton type="delete" onClick={async() => deleteResume(resume.id)}/>
                    </div>
                </div>
            ))}
        </div>
    )
}