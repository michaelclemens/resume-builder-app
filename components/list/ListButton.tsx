export default function ListButton({ label, onClick }: { label: string, onClick: () => void }) {
    return (
        <span onClick={onClick} className="pointer-events-auto cursor-pointer flex-none rounded-md px-2 py-1 font-medium shadow-sm ring-1 ring-slate-700/10 hover:bg-slate-50">
            {label}
        </span>
    )
}