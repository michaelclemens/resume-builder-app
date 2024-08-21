export const getDisplayDateFromDate = (date: Date | undefined) => date?.toISOString().substring(0, 10) ?? ''

export const getDateFromDisplayDate = (date: string) => new Date(new Date(date).toISOString().substring(0, 10) + 'T00:00:00.000Z')
