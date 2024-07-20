export default function Loading() {
    return (
        <div className="h-full w-full p-1 mb-3">
            <div className="animate-pulse py-5 inset-0 z-50 flex items-center justify-center bg-gray-100 bg-opacity-60 rounded-lg ring-1 ring-slate-700/10">
                <span className="text-gray-300 text-3xl font-bold">Loading...</span>
            </div>
        </div>
    )
}