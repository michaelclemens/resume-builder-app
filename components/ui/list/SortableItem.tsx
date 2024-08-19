"use client"

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { RiDraggable } from "react-icons/ri";

export default function SortableItem({ id, children }: { id: string, children: React.ReactNode }) {
    const {
        attributes, listeners, setNodeRef, transform, transition,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} className="relative flex flex-wrap items-center p-3">
            <div {...listeners} {...attributes} className="mr-2 transition-colors duration-500 text-gray-300 cursor-move hover:text-gray-700 dark:text-slate-600 dark:hover:text-slate-200">
                <RiDraggable size="1.25em"/>
            </div>
            {children}
        </div>
    )
}