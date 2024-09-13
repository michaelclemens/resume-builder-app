const compareTime = (a: { createdAt: string | number | Date }, b: { createdAt: string | number | Date }) =>
  new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()

export const sortByLatestCreated = (a: { createdAt: string | number | Date }, b: { createdAt: string | number | Date }) => compareTime(a, b)

export const sortByOrder = (a: { order?: number; createdAt: string | number | Date }, b: { order?: number; createdAt: string | number | Date }) => {
  if (a.order && b.order) {
    return a.order - b.order
  }
  return sortByLatestCreated(a, b)
}
