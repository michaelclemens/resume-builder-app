import { z } from "zod"

export const StrengthSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' })
})

export type StrengthSchemaType = z.infer<typeof StrengthSchema>;