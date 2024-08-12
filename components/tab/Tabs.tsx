"use client"

import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation";
import { useState } from "react";

interface Tab {
    name: string,
    href: string
}

export const activeStyleClass = 'bg-slate-500 text-white dark:bg-slate-700 ';
export const nonActiveStyleClass = 'text-slate-200 bg-slate-400 hover:bg-slate-500 dark:text-slate-400 dark:bg-slate-800 dark:hover:bg-slate-700';

export default function Tabs({ tabs }: { tabs: Tab[] }) {
    const selectedTabName = useSelectedLayoutSegment('sections');
    const initialActiveTab = tabs.find(tab => tab.name === selectedTabName) ?? tabs[0];
    const [activeTab, setActiveTab] = useState(initialActiveTab);

    const isActiveTab = (tab: Tab) => activeTab.name === tab.name

    return (
        <ul className="text-sm font-medium text-center rounded-lg shadow-md flex mb-3">
            {tabs.map(tab => (
                <li key={tab.name} className={`w-full focus-within:z-10 border-r border-r-slate-300 dark:border-r-slate-500 first:rounded-s-lg last:rounded-e-lg last:border-r-0 ${isActiveTab(tab) ? activeStyleClass : nonActiveStyleClass}`}>
                    <Link href={tab.href} onClick={() => setActiveTab(tab)} className={`inline-block w-full p-4 capitalize`}>
                        {tab.name}
                    </Link>
                </li>
            ))}
        </ul> 
    )
}