export default function ExpandableWrapper({ children, open = false }: { children: React.ReactNode; open?: boolean }) {
  return (
    <div className={`w-full overflow-hidden transition-max-height duration-500 ease-in-out ${open ? 'max-h-screen' : 'max-h-0'}`}>
      {open && children}
    </div>
  )
}
