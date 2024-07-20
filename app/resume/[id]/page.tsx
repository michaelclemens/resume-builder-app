import Resume from "@/containers/Resume";
import Link from "next/link";

export default ({ params: {id}}: { params: { id: string }}) => {
    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <Resume id={id} />
            <footer className="mt-auto m-5 pt-3">
                <Link href={"/"}>Back</Link>
            </footer>
        </div>
    )
}