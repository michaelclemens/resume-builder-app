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

export type PersonalSchemaType = z.infer<typeof PersonalSchema>;