import * as z from 'zod'

export const agencyDataSchema = z.object({
    logo: z.string().url(),
    name: z.string().min(1, 'Agency name is required'),
    license: z.string().min(1, 'License number is required'),
    phone: z.string().min(1, 'Phone number is required'),
    email: z.string().email('Invalid email address'),
    address: z.string().min(1, 'Address is required'),
    website: z.string().url('Invalid URL'),
})

export type AgencyData = z.infer<typeof agencyDataSchema>
