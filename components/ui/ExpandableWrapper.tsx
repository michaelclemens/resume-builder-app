export default function ExpandableWrapper({ children, open = false }: { children: React.ReactNode, open?: boolean }) {
    return (
        <div className={`w-full transition-max-height ease-in-out duration-500 overflow-hidden ${open ? 'max-h-screen' : 'max-h-0'}`}>
            {open && children}
        </div>
    )
}