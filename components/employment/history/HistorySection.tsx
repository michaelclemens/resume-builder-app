'use client'

import { EmploymentHistory } from '@prisma/client'
import { useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6'
import { SectionEnums } from '@/types/section'
import { ExpandableWrapper } from '@/components/ui'
import { SectionForm } from '@/components/ui/form'
import { SectionList } from '@/components/ui/list'

export default function HistorySection({ employmentId, histories }: { employmentId: string; histories: EmploymentHistory[] }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="mt-3 mb-1 flex w-full flex-wrap rounded-lg bg-white/10 px-2 py-3 ring-1 ring-slate-300/60 dark:bg-blue-900/10 dark:ring-slate-400/20">
      <div onClick={() => setOpen(!open)} className="flex w-full cursor-pointer">
        <span className="ml-2 flex-auto text-sm font-semibold">Employment History</span>
        <span className="mr-2 ml-auto flex">{open ? <FaChevronUp title="Close" /> : <FaChevronDown title="Open" />}</span>
      </div>
      <ExpandableWrapper open={open}>
        <SectionList sectionType={SectionEnums.employmentHistory} initialItems={histories} parentId={employmentId} parentProperty="employmentId" />
        <SectionForm sectionType={SectionEnums.employmentHistory} parentId={employmentId} />
      </ExpandableWrapper>
    </div>
  )
}
