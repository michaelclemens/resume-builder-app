"use client"

import { ExpandableWrapper } from "@/components/util";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { EmploymentHistory } from "@prisma/client";
import { List } from "@/components/list";
import { useEmploymentHistoryList } from "@/hooks/list";
import { Form } from "@/components/form";
import { EmploymentHistorySchemaType } from "@/types/form";
import { useEmploymentHistoryForm } from "@/hooks/form";
import { FormBodyHistory, ListItemHistory } from "@/components";

export default function HistorySection({ employmentId, histories }: { employmentId: string, histories: EmploymentHistory[] }) {
    const [open, setOpen] = useState(false);
    
    return (
        <div className="w-full flex flex-wrap mt-3 mb-1 bg-gray-100 px-2 py-3 rounded-lg ring-1 ring-slate-700/10">
            <div onClick={() => setOpen(!open)} className="w-full flex cursor-pointer">
                <span className="flex-auto text-sm ml-2 font-semibold">Employment History</span>
                <span className="ml-auto flex mr-2">{open ? <FaChevronUp /> : <FaChevronDown />}</span>
            </div>
            <ExpandableWrapper open={open}>
                <List<EmploymentHistory> 
                    useListHook={useEmploymentHistoryList} 
                    itemComponent={ListItemHistory} 
                    initialItems={histories}
                    parentId={employmentId}
                />
                <Form<EmploymentHistory, EmploymentHistorySchemaType>
                    parentId={employmentId}
                    useFormHook={useEmploymentHistoryForm}
                    formBody={FormBodyHistory}
                />
            </ExpandableWrapper>
        </div>
    )
}