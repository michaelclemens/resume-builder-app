"use client"

import { ExpandableWrapper } from "@/components/util";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { EmploymentHistory } from "@prisma/client";
import { SectionList } from "@/components/list";
import { SectionForm } from "@/components/form";
import { SectionEnums } from "@/types/section";

export default function HistorySection({ employmentId, histories }: { employmentId: string, histories: EmploymentHistory[] }) {
    const [open, setOpen] = useState(false);  
    return (
        <div className="w-full flex flex-wrap mt-3 mb-1 bg-gray-100 px-2 py-3 rounded-lg ring-1 ring-slate-700/10 dark:bg-slate-900 dark:ring-slate-700">
            <div onClick={() => setOpen(!open)} className="w-full flex cursor-pointer">
                <span className="flex-auto text-sm ml-2 font-semibold">Employment History</span>
                <span className="ml-auto flex mr-2">{open ? <FaChevronUp title="Close" /> : <FaChevronDown title="Open" />}</span>
            </div>
            <ExpandableWrapper open={open}>
                <SectionList 
                    sectionType={SectionEnums.employmentHistory}
                    initialItems={histories}
                    parentId={employmentId}
                    parentProperty="employmentId"
                />
                <SectionForm
                    sectionType={SectionEnums.employmentHistory}
                    parentId={employmentId}
                />
            </ExpandableWrapper>
        </div>
    )
}