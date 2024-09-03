import { format } from 'date-fns'

export const getInputDate = (date: Date | undefined) => (date ? format(date, 'yyyy-MM') : '')

export const getDisplayDate = (date: Date | null | undefined) => (date ? format(date, 'MMM yyyy') : '')

export const getMockDBDate = (date: Date) => new Date(format(date, 'yyyy-MM-01'))

export const getMockInputDate = (date: Date) => new Date(getInputDate(date))
