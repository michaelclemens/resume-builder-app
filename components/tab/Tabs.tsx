"use client"

import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation";
import { useState } from "react";

interface Tab {
    name: string,
    href: string
}

export const activeStyleClass = 'text-white bg-gray-700';
export const nonActiveStyleClass = 'text-gray-400 bg-gray-800 hover:bg-gray-700';

export default function Tabs({ tabs }: { tabs: Tab[] }) {
    const selectedTabName = useSelectedLayoutSegment('sections');
    const initialActiveTab = tabs.find(tab => tab.name === selectedTabName) ?? tabs[0];
    const [activeTab, setActiveTab] = useState(initialActiveTab);

    const isActiveTab = (tab: Tab) => activeTab.name === tab.name

    return (
        <ul className="text-sm font-medium text-center rounded-lg shadow flex divide-gray-700 mb-3">
            {tabs.map(tab => (
                <li key={tab.name} className={`w-full focus-within:z-10 border-r rounded-none border-gray-600 first:rounded-s-lg last:rounded-e-lg last:border-s-0 ${isActiveTab(tab) ? activeStyleClass : nonActiveStyleClass}`}>
                    <Link href={tab.href} onClick={() => setActiveTab(tab)} className={`inline-block w-full p-4 capitalize`}>
                        {tab.name}
                    </Link>
                </li>
            ))}
        </ul> 
    )
}