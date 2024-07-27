import { z } from "zod"

export const SkillSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' })
})

export type SkillSchemaType = z.infer<typeof SkillSchema>;