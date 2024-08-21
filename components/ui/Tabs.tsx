'use client'

import { useRouter, useSelectedLayoutSegment } from 'next/navigation'
import { useState } from 'react'

interface Tab {
  name: string
  href: string
}

export const activeStyleClass = 'bg-slate-500 text-white dark:bg-slate-700 pointer-events-none cursor-none'
export const nonActiveStyleClass = 'text-slate-200 bg-slate-400 hover:bg-slate-500 dark:text-slate-400 dark:bg-slate-800 dark:hover:bg-slate-700'

export default function Tabs({ tabs }: { tabs: Tab[] }) {
  const { push } = useRouter()
  const selectedTabName = useSelectedLayoutSegment('sections')
  const initialActiveTab = tabs.find(tab => tab.name === selectedTabName) ?? tabs[0]
  const [activeTab, setActiveTab] = useState(initialActiveTab)

  const isActiveTab = (tab: Tab) => activeTab.name === tab.name

  const selectTab = (tab: Tab) => {
    if (isActiveTab(tab)) return
    push(tab.href)
    setActiveTab(tab)
  }

  return (
    <ul className='mb-3 flex rounded-lg text-center text-sm font-medium shadow-md'>
      {tabs.map(tab => (
        <li
          key={tab.name}
          className={`w-full border-r border-r-slate-300 first:rounded-s-lg last:rounded-e-lg last:border-r-0 focus-within:z-10 dark:border-r-slate-500 ${isActiveTab(tab) ? activeStyleClass : nonActiveStyleClass}`}
        >
          <button onClick={() => selectTab(tab)} className='inline-block w-full p-4 capitalize'>
            {tab.name}
          </button>
        </li>
      ))}
    </ul>
  )
}
