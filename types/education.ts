import { z } from "zod"

export const EducationSchema = z.object({
    school: z.string().min(1, { message: 'School is required' }),
    degree: z.string().min(1, { message: 'Degree is required' }),
    startDate: z.string().date().min(1, { message: 'Start Date is required'}),
    endDate: z.string().date().optional().or(z.literal('')),
    city: z.string().optional(),
    description: z.string().optional(),
})

export type EducationSchemaType = z.infer<typeof EducationSchema>;