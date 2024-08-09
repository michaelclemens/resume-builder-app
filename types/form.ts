import { z } from "zod"

export const PersonalSchema = z.object({
    firstName: z.string().min(1, { message: 'First Name is required' }),
    lastName: z.string().min(1, { message: 'Last Name is required' }),
    position: z.string().optional(),
    summary: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    city: z.string().optional(),
    country: z.string().optional(),
})

export const EmploymentSchema = z.object({
    employer: z.string().min(1, { message: 'Employer is required' }),
    city: z.string().optional(),
})

export const EmploymentHistorySchema = z.object({
    title: z.string().min(1, { message: 'Title is required' }),
    startDate: z.string().date().min(1, { message: 'Start Date is required'}),
    endDate: z.string().date().optional().or(z.literal('')),
    description: z.string().optional(),
})

export const EducationSchema = z.object({
    school: z.string().min(1, { message: 'School is required' }),
    degree: z.string().min(1, { message: 'Degree is required' }),
    startDate: z.string().date().min(1, { message: 'Start Date is required'}),
    endDate: z.string().date().optional().or(z.literal('')),
    city: z.string().optional(),
    description: z.string().optional(),
})

export const SkillSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' })
})

export const StrengthSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' })
})

export type PersonalSchemaType = z.infer<typeof PersonalSchema>
export type EmploymentSchemaType = z.infer<typeof EmploymentSchema>
export type EmploymentHistorySchemaType = z.infer<typeof EmploymentHistorySchema>
export type EducationSchemaType = z.infer<typeof EducationSchema>
export type SkillSchemaType = z.infer<typeof SkillSchema>
export type StrengthSchemaType = z.infer<typeof StrengthSchema>

export type SectionSchemaType = typeof PersonalSchema | typeof EmploymentSchema | typeof EmploymentHistorySchema | typeof EducationSchema | typeof SkillSchema | typeof StrengthSchema;
export type SectionSchemaValueType = PersonalSchemaType | EmploymentSchemaType | EmploymentHistorySchemaType | EducationSchemaType | SkillSchemaType | StrengthSchemaType;