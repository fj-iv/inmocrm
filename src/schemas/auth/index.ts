import * as z from 'zod'

export const RegisterSchema = z
    .object({
        name: z
            .string()
            .min(1, {
                message: 'Name is required',
            })
            .max(255, {
                message: 'Name must be less than 256 characters',
            }),
        email: z
            .string()
            .email({
                message: 'Invalid email address',
            })
            .max(255, {
                message: 'Email must be less than 256 characters',
            }),
        password: z
            .string()
            .min(8, { message: 'Password must be at least 8 characters' })
            .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
            .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
            .regex(/[0-9]/, { message: 'Password must contain at least one number' })
            .regex(/[\W_]/, { message: 'Password must contain at least one special character' }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    })

export type RegisterSchemaType = z.infer<typeof RegisterSchema>

export const LoginSchema = z.object({
    email: z.string().email({
        message: 'Invalid email address',
    }),
    password: z.string().min(6, {
        message: 'Password must be at least 6 characters',
    }),
})

export type LoginSchemaType = z.infer<typeof LoginSchema>
