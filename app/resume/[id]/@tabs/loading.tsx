export default function Loading() {
    return (
        <div className="h-full w-full p-1">
            <div className="animate-pulse py-5 z-50 flex items-center justify-center bg-gray-100 bg-opacity-60 rounded-md ring-1 ring-slate-700/10">
                <span className="text-gray-300 text-3xl font-semibold">Loading...</span>
            </div>
        </div>
    )
}