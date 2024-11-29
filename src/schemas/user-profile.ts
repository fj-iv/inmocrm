import * as z from 'zod'

export const userProfileSchema = z
    .object({
        profileImage: z.string().url(),
        fullName: z.string().min(1, 'Full Name is required'),
        email: z.string().email('Invalid email address'),
        phone: z.string().min(1, 'Phone number is required'),
        license: z.string().min(1, 'License number is required'),
        currentPassword: z.string().min(8, 'Current Password must be at least 8 characters long'),
        newPassword: z.string().min(8, 'New Password must be at least 8 characters long'),
        confirmPassword: z.string().min(8, 'Confirm Password must be at least 8 characters long'),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: 'New Password and Confirm Password must match',
        path: ['confirmPassword'],
    })

export type UserProfileData = z.infer<typeof userProfileSchema>

