export default function LoadingOverlay() {
    return (
        <div className="absolute w-full h-full p-0.5 -ml-5 z-50">
            <div className="w-full h-full pointer-events-none rounded-lg animate-pulse opacity-60 bg-gray-200"/>
        </div>
    )
}