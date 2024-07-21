import ListHistory from "./ListHistory";
import FormHistory from "./FormHistory";
import { EmploymentHistory } from "@prisma/client";
import { ExpandableWrapper } from "@/components/util";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";

export default function HistorySection({ employmentId, histories }: { employmentId: string, histories: EmploymentHistory[] }) {
    const [open, setOpen] = useState(false);
    
    return (
        <div className="w-full flex flex-wrap mt-3 mb-1 bg-gray-100 px-2 py-3 rounded-lg ring-1 ring-slate-700/10">
            <div onClick={() => setOpen(!open)} className="w-full flex cursor-pointer">
                <span className="flex-auto text-sm ml-2 font-semibold">Employment History</span>
                <span className="ml-auto flex mr-2">{open ? <FaChevronUp /> : <FaChevronDown />}</span>
            </div>
            <ExpandableWrapper open={open}>
                <ListHistory employmentId={employmentId} histories={histories} />
                <FormHistory employmentId={employmentId}/>
            </ExpandableWrapper>
        </div>
    )
}