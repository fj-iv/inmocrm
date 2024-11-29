import * as z from 'zod'

export const contactFormSchema = z.object({
    fullName: z.string().min(2, {
        message: 'Full name must be at least 2 characters.',
    }),
    status: z.string().min(1, {
        message: 'Please select a status.',
    }),
    priority: z.string().min(1, {
        message: 'Please select a priority.',
    }),
    email: z.string().email({
        message: 'Please enter a valid email address.',
    }),
    phone: z.string().min(10, {
        message: 'Phone number must be at least 10 digits.',
    }),
    address: z.string().min(5, {
        message: 'Address must be at least 5 characters.',
    }),
    dateOfBirth: z.date({
        required_error: 'Please select a date of birth.',
    }),
    preferredContactMethod: z.number().min(1, {
        message: 'Please select a preferred contact method.',
    }),
    preferredContactTime: z.enum(['morning', 'afternoon', 'evening'], {
        required_error: 'Please select a preferred contact time.',
    }),
    contactProfiles: z.array(z.number()).min(1, {
        message: 'Please select at least one contact profile.',
    }),
    budget: z.string().min(1, {
        message: 'Please enter a budget range.',
    }),
    preApproved: z.boolean(),
    clientRating: z.string(),
    bankAccount: z.string().length(4, {
        message: 'Bank account must be exactly 4 digits.',
    }),
    acquiredBy: z.string().min(1, {
        message: 'Please select the acquiring agent.',
    }),
    currentAgent: z.string().min(1, {
        message: 'Please select the current agent.',
    }),
    initialContactMethod: z.number().min(1, {
        message: 'Please select the initial contact method.',
    }),
    propertyPreferences: z.array(z.number()).min(1, {
        message: 'Please select at least one property preference.',
    }),
    buyingProcessProgress: z.string(),
    notes: z.string(),
})
