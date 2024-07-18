'use client'

import { sanitize } from "isomorphic-dompurify";

export default function RenderHtml({ html }: { html: string }) {
    const createMarkup = (dirty: string) => ({ __html: sanitize(dirty) })

    return (
        <div className="no-tailwindcss" dangerouslySetInnerHTML={createMarkup(html)} />
    )
}