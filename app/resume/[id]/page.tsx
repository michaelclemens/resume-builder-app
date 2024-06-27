import Loading from "@/app/loading";
import Resume from "@/components/Resume";
import Link from "next/link";
import { Suspense } from "react";

export default ({ params: {id}}: { params: { id: string }}) => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Suspense fallback={<Loading/>}>
                <Resume id={id} />
            </Suspense>
            <Link href={"/"}>Back</Link>
        </main>
    )
}