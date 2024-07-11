import ListItemStrength from "./ListItemStrength";
import { sortByOrder } from "@/util/sort";
import { Strength } from "@prisma/client";
import { closestCenter, DndContext, PointerSensor, useSensor } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { restrictToParentElement, restrictToVerticalAxis } from "@dnd-kit/modifiers";
import useStrength from "@/hooks/useStrength";

export default function ListStrengths({ strengths }: { strengths: Strength[] }) {
    if (!strengths || !strengths.length) return <p>No Strengths</p>

    const { saveSortOrder } = useStrength();

    const onDragEnd = (event) => {
        const {active, over} = event;
    
        if (active.id !== over.id) {
            const oldIndex = strengths.findIndex(strength => strength.id === active.id);
            const newIndex = strengths.findIndex(strength => strength.id === over.id);

            saveSortOrder(arrayMove(strengths, oldIndex, newIndex))
        }
    }

    return (
        <div>
            <DndContext 
                sensors={[useSensor(PointerSensor)]} 
                modifiers={[restrictToVerticalAxis, restrictToParentElement]}
                collisionDetection={closestCenter} 
                onDragEnd={onDragEnd}
            >
                <SortableContext items={strengths} strategy={verticalListSortingStrategy}>
                    {strengths.sort(sortByOrder).map((strength) => (
                        <ListItemStrength key={strength.id} strength={strength} />
                    ))}
                </SortableContext>
            </DndContext>
        </div>
    )
}