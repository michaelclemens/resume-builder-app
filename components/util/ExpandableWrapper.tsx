export default function ExpandableWrapper({ children, open = false, initialMaxHeight = 'max-h-0' }: { children: React.ReactNode, open?: boolean, initialMaxHeight?: string }) {
    return (
        <div className={`w-full transition-max-height ease-in-out duration-500 overflow-hidden ${open ? 'max-h-screen' : initialMaxHeight}`}>
            {children}
        </div>
    )
}