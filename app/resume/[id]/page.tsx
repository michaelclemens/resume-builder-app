import Resume from "@/containers/Resume";
import Link from "next/link";

export default ({ params: {id}}: { params: { id: string }}) => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-10">
            <Resume id={id} />
            <Link href={"/"}>Back</Link>
        </main>
    )
}