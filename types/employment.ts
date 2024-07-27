import { z } from "zod"

export const EmploymentSchema = z.object({
    employer: z.string().min(1, { message: 'Employer is required' }),
    city: z.string().optional(),
})

export type EmploymentSchemaType = z.infer<typeof EmploymentSchema>;

export const EmploymentHistorySchema = z.object({
    title: z.string().min(1, { message: 'Title is required' }),
    startDate: z.string().date().min(1, { message: 'Start Date is required'}),
    endDate: z.string().date().optional().or(z.literal('')),
    description: z.string().optional(),
})

export type EmploymentHistorySchemaType = z.infer<typeof EmploymentHistorySchema>;