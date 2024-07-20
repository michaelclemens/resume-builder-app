export default function SubmitButton({ label, disabled = false }: { label: string, disabled?: boolean }) {
    return (
        <div className="mt-2">
            <button 
                type="submit" 
                disabled={disabled} 
                className="w-full px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600 disabled:opacity-50 disabled:pointer-events-none"
            >
                {label}
            </button>
        </div>
    )
}