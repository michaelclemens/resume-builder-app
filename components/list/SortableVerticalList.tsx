"use client"

import { closestCenter, DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { restrictToParentElement, restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useId } from "react";

interface SortableItem {
    id: string,
    order: number | null
}

export default function SortableVerticalList<T extends SortableItem>({ items, children, onNewSortOrder }: { items: T[], children: React.ReactNode, onNewSortOrder: (sortedItems: T[]) => Promise<void> }) {
    const id = useId();
    const sensors = useSensors(useSensor(PointerSensor));

    const onDragEnd = (event: DragEndEvent) => {
        const {active, over} = event;

        if (!over) return
        
        if (active.id !== over.id) {
            const oldIndex = items.findIndex(item => item.id === active.id)
            const newIndex = items.findIndex(item => item.id === over.id)

            const newItems = arrayMove(items, oldIndex, newIndex).map((item, index) => ({ ...item, order: index + 1 }))

            onNewSortOrder(newItems)
        }
    }

    return (
        <div className="rounded-lg bg-white mx-1 mt-2 divide-y divide-slate-400/20 ring-1 ring-slate-700/10">
            <DndContext
                id={`dnd-${id}`}
                sensors={sensors} 
                modifiers={[restrictToVerticalAxis, restrictToParentElement]}
                collisionDetection={closestCenter} 
                onDragEnd={onDragEnd}
            >
                <SortableContext items={items} strategy={verticalListSortingStrategy}>
                    {children}
                </SortableContext>
            </DndContext>
        </div>
    )
}