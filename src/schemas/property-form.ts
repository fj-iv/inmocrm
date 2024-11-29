import * as z from 'zod'

export const propertyFormSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    propertyType: z.string().min(1, 'Property type is required'),
    lotSize: z.string().min(1, 'Lot size is required'),
    floor: z.string().min(1, 'Floor is required'),
    elevator: z.boolean(),
    parking: z.string().min(1, 'Parking information is required'),
    yearBuilt: z.number().int().positive('Year built must be positive'),
    status: z.string().min(1, 'Status is required'),
    price: z.string().min(1, 'Price is required'),
    address: z.string().min(1, 'Address is required'),
    features: z.array(z.string()),
    images: z.array(z.string()).min(1, 'At least one image is required'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    highlights: z.array(z.string()),
    statusHistory: z.array(
        z.object({
            status: z.string(),
            date: z.string(),
            description: z.string(),
        })
    ),
    location: z.object({
        latitude: z.number().min(-90).max(90),
        longitude: z.number().min(-180).max(180),
    }),
    forSale: z.object({
        isListed: z.boolean(),
        listPrice: z.string().min(1, 'List price is required when listed for sale'),
        pricePerSqft: z.string().min(1, 'Price per sqft is required when listed for sale'),
        estimatedMortgage: z.string().min(1, 'Estimated mortgage is required when listed for sale'),
    }),
    forRent: z.object({
        isListed: z.boolean(),
        monthlyRent: z.string().min(1, 'Monthly rent is required when listed for rent'),
        securityDeposit: z.string().min(1, 'Security deposit is required when listed for rent'),
        leaseTerm: z.string().min(1, 'Lease term is required when listed for rent'),
    }),
    financialDetails: z.object({
        propertyTaxes: z.string().min(1, 'Property taxes information is required'),
        hoaFees: z.string().min(1, 'HOA fees information is required'),
        insurance: z.string().min(1, 'Insurance information is required'),
    }),
    cadasterInformation: z.object({
        parcelNumber: z.string().min(1, 'Parcel number is required'),
        legalDescription: z.string().min(1, 'Legal description is required'),
        zoning: z.string().min(1, 'Zoning information is required'),
        landValue: z.string().min(1, 'Land value is required'),
        improvementValue: z.string().min(1, 'Improvement value is required'),
    }),
    agentInformation: z.object({
        name: z.string().min(1, 'Agent name is required'),
        title: z.string().min(1, 'Agent title is required'),
        phone: z.string().min(10, 'Valid phone number is required'),
        email: z.string().email('Valid email is required'),
        image: z.string().url('Valid image URL is required'),
    }),
    documents: z.array(
        z.object({
            name: z.string().min(1, 'Document name is required'),
            url: z.string().url('Valid document URL is required'),
        })
    ),
})

export type PropertyFormData = z.infer<typeof propertyFormSchema>
