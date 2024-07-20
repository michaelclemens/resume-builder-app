import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function SortableItem({ id, children }: { id: string, children: React.ReactNode }) {
    const {
        attributes, listeners, setNodeRef, transform, transition,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} className="flex flex-wrap items-center px-5 py-3 text-gray-700">
            <div {...listeners} {...attributes} className="-ml-2 mr-2">::</div>
            {children}
        </div>
    )
}