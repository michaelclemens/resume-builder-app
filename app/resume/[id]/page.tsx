import Resume from "@/containers/Resume";
import Link from "next/link";

export default ({ params: {id}}: { params: { id: string }}) => {
    return (
        <main className="p-10">
            <Resume id={id} />
            <Link href={"/"}>Back</Link>
        </main>
    )
}