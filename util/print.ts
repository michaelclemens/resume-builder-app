const A4Heightpx = 1122;

export const fixPDFHeight = (element: HTMLElement|null) => {
    if (!element) return;
    const resumeHeight = element.clientHeight;
    if (!resumeHeight) return

    const numberOfPages = Math.ceil(resumeHeight / A4Heightpx);
    if (numberOfPages > 1) {
        const newHeight = A4Heightpx * numberOfPages;
        element.style.setProperty('--print-height', `${newHeight}px`);
    }
}