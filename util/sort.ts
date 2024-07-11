const compareTime = (a, b) => (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())

export const sortByLatestCreated = (a, b) => compareTime(a, b)

export const sortByOrder = (a, b) => {
    if (a.order && b.order) {
        return a.order - b.order
    }
    return sortByLatestCreated(a, b)
}