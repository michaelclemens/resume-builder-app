export default function SubmitButton({ label }: { label: string }) {
    return (
        <div className="mt-2">
            <button type="submit" className="w-full px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                {label}
            </button>
        </div>
    )
}