const A4Heightpx = 1122

export const fixPDFHeight = (element: HTMLElement | null) => {
  if (!element) return
  const resumeHeight = element.clientHeight
  if (!resumeHeight) return

  const numberOfPages = Math.ceil(resumeHeight / A4Heightpx)
  if (numberOfPages > 1) {
    const newHeight = A4Heightpx * numberOfPages
    element.style.setProperty('--print-height', `${newHeight}px`)
  }
}

export const downloadPDF = (blob: Blob, filename: string) => {
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.setAttribute('style', 'display:none')
  link.setAttribute('href', url)
  link.setAttribute('download', filename)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}
