export interface PropertyListing {
    id: string
    type: string
    location: string
    street: string
    sellingPrice: string
    rentingPrice: string
    leads: number
    rating: string
    matches: number
    agent: {
        name: string
        image: string
    }
    creationDate: string
    conservationState: string
    operation: string
    state: string
    exclusive: string
}

const DUMMY_PROPERTIES = [
    {
        id: '123456',
        type: 'Flat',
        location: 'San Francisco',
        street: '123 Main St',
        sellingPrice: '€500,000',
        rentingPrice: '€2,500/month',
        leads: 25,
        rating: '92%',
        matches: 15,
        agent: {
            name: 'John Doe',
            image: '/agent1.jpg',
        },
        creationDate: '2023-05-12',
        conservationState: 'Good',
        operation: 'Sale',
        state: 'Available',
        exclusive: 'Yes',
    },
    {
        id: '654321',
        type: 'House',
        location: 'Los Angeles',
        street: '456 Elm St',
        sellingPrice: '€1,200,000',
        rentingPrice: '€4,000/month',
        leads: 30,
        rating: '95%',
        matches: 20,
        agent: {
            name: 'Jane Smith',
            image: '/agent2.jpg',
        },
        creationDate: '2023-06-15',
        conservationState: 'Excellent',
        operation: 'Rent',
        state: 'Rented',
        exclusive: 'No',
    },
    {
        id: '789012',
        type: 'Condo',
        location: 'Miami',
        street: '789 Ocean Dr',
        sellingPrice: '€800,000',
        rentingPrice: '€3,500/month',
        leads: 40,
        rating: '90%',
        matches: 25,
        agent: {
            name: 'Alice Johnson',
            image: '/agent3.jpg',
        },
        creationDate: '2023-07-20',
        conservationState: 'New',
        operation: 'Sale',
        state: 'Available',
        exclusive: 'Yes',
    },
]

function generateProperties() {
    const properties = []
    for (let i = 0; i < 55; i++) {
        const property = { ...DUMMY_PROPERTIES[i % DUMMY_PROPERTIES.length] }
        const randomId = Math.random().toString(36).substr(2, 9)
        property.id = randomId
        property.street = `${property.street} ${randomId}`
        properties.push(property)
    }
    return properties
}

export async function getProperties(page: number = 1, perPage: number = 8): Promise<any> {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const allProperties = generateProperties()
    const total = allProperties.length
    const lastPage = Math.ceil(total / perPage)
    const from = (page - 1) * perPage
    const to = Math.min(from + perPage, total)

    const data = allProperties.slice(from, to)

    const baseUrl = '/properties'

    return {
        data,
        links: {
            first: `${baseUrl}?page=1`,
            last: `${baseUrl}?page=${lastPage}`,
            prev: page > 1 ? `${baseUrl}?page=${page - 1}` : null,
            next: page < lastPage ? `${baseUrl}?page=${page + 1}` : null,
        },
        meta: {
            current_page: page,
            from: from + 1,
            last_page: lastPage,
            per_page: perPage,
            to,
            total,
        },
    }
}

export interface ContactListing {
    id: string
    name: string
    avatar: string
    email: string
    phone: string
    membership: string
    language: string
    createdDate: string
    lastContactedDate: string
    assignedAgent: {
        name: string
        avatar: string
        email: string
    }
}

const DUMMY_CONTACTS = [
    {
        id: '123456',
        name: 'John Doe',
        avatar: '/placeholder-user.jpg',
        email: 'john.doe@example.com',
        phone: '+1 (555) 1234-5678',
        membership: 'Premium',
        language: 'English',
        createdDate: '2023-05-12',
        lastContactedDate: '2022-08-01',
        assignedAgent: {
            name: 'Jane Smith',
            avatar: '/placeholder-user.jpg',
            email: 'jane.smith@example.com',
        },
    },
    {
        id: '654321',
        name: 'Alice Johnson',
        avatar: '/placeholder-user.jpg',
        email: 'alice.johnson@example.com',
        phone: '+1 (555) 8765-4321',
        membership: 'Standard',
        language: 'Spanish',
        createdDate: '2023-06-15',
        lastContactedDate: '2022-09-10',
        assignedAgent: {
            name: 'Bob Brown',
            avatar: '/placeholder-user.jpg',
            email: 'bob.brown@example.com',
        },
    },
    {
        id: '789012',
        name: 'Michael Brown',
        avatar: '/placeholder-user.jpg',
        email: 'michael.brown@example.com',
        phone: '+1 (555) 9876-5432',
        membership: 'Basic',
        language: 'French',
        createdDate: '2023-07-20',
        lastContactedDate: '2022-10-05',
        assignedAgent: {
            name: 'Alice Green',
            avatar: '/placeholder-user.jpg',
            email: 'alice.green@example.com',
        },
    },
]

function generateRandomId() {
    return Math.random().toString(36).substr(2, 9)
}

function generateContacts() {
    const contacts = []
    for (let i = 0; i < 55; i++) {
        const contact = { ...DUMMY_CONTACTS[i % DUMMY_CONTACTS.length] }
        const randomId = generateRandomId()
        contact.id = randomId
        contact.name = `${contact.name} ${randomId}`
        contacts.push(contact)
    }
    return contacts
}

export async function getContacts(page: number = 1, perPage: number = 8): Promise<any> {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const allContacts = generateContacts()
    const total = allContacts.length
    const lastPage = Math.ceil(total / perPage)
    const from = (page - 1) * perPage
    const to = Math.min(from + perPage, total)

    const data = allContacts.slice(from, to)

    const baseUrl = '/contacts'

    return {
        data,
        links: {
            first: `${baseUrl}?page=1`,
            last: `${baseUrl}?page=${lastPage}`,
            prev: page > 1 ? `${baseUrl}?page=${page - 1}` : null,
            next: page < lastPage ? `${baseUrl}?page=${page + 1}` : null,
        },
        meta: {
            current_page: page,
            from: from + 1,
            last_page: lastPage,
            path: baseUrl,
            per_page: perPage,
            to,
            total,
        },
    }
}

export interface Contact {
    id: string
    avatarSrc: string
    avatarAlt: string
    avatarFallback: string
    name: string
    description: string
    status: string
    priority: string
    rgpdAccepted: boolean
    profiles: number[]
    personalInformation: {
        email: string
        phone: string
        address: string
        dateOfBirth: string
        preferredContactMethod: number
        preferredContactTime: string
    }
    financialInformation: {
        budget: string
        preApproved: string
        clientRating: number
        bankAccount: string
    }
    agentInformation: {
        acquiredBy: {
            name: string
            avatar: string
        }
        currentAgent: {
            name: string
            avatar: string
        }
        initialContactMethod: number
    }
    administrativeDetails: {
        clientId: string
        registrationDate: string
        lastUpdated: string
    }
    propertyPreferences: number[]
    buyingProcessProgress: number
    recentActivity: {
        description: string
        timeAgo: string
    }[]
    relevantNotes: {
        note: string
        addedBy: string
        timeAgo: string
    }[]
}

const DUMMY_CONTACT_DATA = {
    id: '123456',
    avatarSrc: '/placeholder.svg?height=96&width=96',
    avatarAlt: 'Client',
    avatarFallback: 'JD',
    name: 'John Doe',
    description: 'Looking for a family home',
    status: 'active',
    priority: 'high',
    rgpdAccepted: true,
    profiles: [1, 2, 3],
    personalInformation: {
        email: 'john.doe@example.com',
        phone: '(555) 123-4567',
        address: '123 Main St, Anytown, USA 12345',
        dateOfBirth: '1985-03-25',
        preferredContactMethod: 1,
        preferredContactTime: 'afternoon',
    },
    financialInformation: {
        budget: '$500,000 - $750,000',
        preApproved: 'Yes',
        clientRating: 4,
        bankAccount: '1234',
    },
    agentInformation: {
        acquiredBy: {
            name: 'Sarah Johnson',
            avatar: '/placeholder.svg?height=24&width=24',
        },
        currentAgent: {
            name: 'Michael Smith',
            avatar: '/placeholder.svg?height=24&width=24',
        },
        initialContactMethod: 2,
    },
    administrativeDetails: {
        clientId: 'CL-12345',
        registrationDate: '2023-05-12',
        lastUpdated: '2023-08-01',
    },
    propertyPreferences: [1, 2, 3],
    buyingProcessProgress: 60,
    recentActivity: [
        { description: 'Viewed property at 456 Elm St', timeAgo: '2 days ago' },
        { description: 'Updated budget range', timeAgo: '1 week ago' },
        { description: 'Initial consultation completed', timeAgo: '2 weeks ago' },
    ],
    relevantNotes: [
        {
            note: 'Client is very interested in properties with a home office due to remote work arrangements.',
            addedBy: 'Michael Smith (Agent)',
            timeAgo: '3 days ago',
        },
        {
            note: 'Prefers modern architecture and open floor plans. Willing to consider fixer-uppers if the location is ideal.',
            addedBy: 'Sarah Johnson (Agent)',
            timeAgo: '1 week ago',
        },
        {
            note: 'Client mentioned they might need to move quickly due to a job relocation. Keep an eye out for properties that can close within 45 days.',
            addedBy: 'Michael Smith (Agent)',
            timeAgo: '2 weeks ago',
        },
    ],
}

export async function getContact(id: String): Promise<Contact> {
    // Simulate loading delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return DUMMY_CONTACT_DATA
}

export const deleteContact = async (id: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Simulate successful deletion
    console.log(`Deleted contact with ID: ${id}`)
}

export interface Property {
    id: string
    title: string
    propertyType: string
    lotSize: string
    floor: string
    elevator: boolean
    parking: string
    yearBuilt: number
    status: string
    price: string
    address: string
    features: string[]
    images: string[]
    description: string
    highlights: string[]
    statusHistory: {
        status: string
        date: string
        description: string
    }[]
    location: {
        latitude: number
        longitude: number
    }
    forSale: {
        isListed: boolean
        listPrice: string
        pricePerSqft: string
        estimatedMortgage: string
    }
    forRent: {
        isListed: boolean
        monthlyRent: string
        securityDeposit: string
        leaseTerm: string
    }
    financialDetails: {
        propertyTaxes: string
        hoaFees: string
        insurance: string
    }
    cadasterInformation: {
        parcelNumber: string
        legalDescription: string
        zoning: string
        landValue: string
        improvementValue: string
    }
    agentInformation: {
        name: string
        title: string
        phone: string
        email: string
        image: string
    }
    documents: {
        name: string
        url: string
    }[]
}

export async function getProperty(id: String): Promise<Property> {
    // Simulate loading delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return {
        id: '123456',
        title: 'Beautiful Family Home',
        propertyType: 'Single Family Home',
        lotSize: '0.25 acres',
        floor: '2nd',
        elevator: true,
        parking: '2 Car Garage',
        yearBuilt: 2015,
        status: 'For Sale',
        price: '$750,000',
        address: '123 Main St, Anytown, USA 12345',
        features: ['4 Beds', '3 Baths', '2,500 sqft', '0.25 acres', 'Forced Air', 'Central Air'],
        images: [
            '/placeholder.svg?height=400&width=600',
            '/placeholder.svg?height=400&width=600',
            '/placeholder.svg?height=400&width=600',
            '/placeholder.svg?height=400&width=600',
        ],
        description:
            "This beautiful family home offers modern living in a prime location. With 4 bedrooms and 3 bathrooms, there's plenty of space for everyone. The open-concept living area is perfect for entertaining, and the gourmet kitchen features high-end appliances. The master suite includes a luxurious bathroom and walk-in closet. Outside, you'll find a spacious backyard with a patio, perfect for summer barbecues.",
        highlights: [
            'Hardwood floors throughout',
            'Gourmet kitchen with granite countertops',
            'Stainless steel appliances',
            'Master suite with walk-in closet',
            'Finished basement',
            'Energy-efficient windows',
            'Smart home features',
            'Landscaped yard with irrigation system',
        ],
        statusHistory: [
            {
                status: 'Available',
                date: 'August 1, 2023',
                description: 'Sale fell through, property back on market',
            },
            {
                status: 'Reserved',
                date: 'July 15, 2023',
                description: 'Offer accepted, pending sale',
            },
            {
                status: 'Available',
                date: 'June 1, 2023',
                description: 'Property listed on the market',
            },
        ],
        location: {
            latitude: 37.7749,
            longitude: -122.4194,
        },
        forSale: {
            isListed: true,
            listPrice: '$750,000',
            pricePerSqft: '$300',
            estimatedMortgage: '$3,500/month',
        },
        forRent: {
            isListed: true,
            monthlyRent: '$3,000',
            securityDeposit: '$4,500',
            leaseTerm: '12 months',
        },
        financialDetails: {
            propertyTaxes: '$5,000/year',
            hoaFees: '$200/month',
            insurance: '$1,200/year',
        },
        cadasterInformation: {
            parcelNumber: '123-456-789',
            legalDescription: 'Lot 7, Block 3, Anytown Subdivision',
            zoning: 'Residential R-1',
            landValue: '$200,000',
            improvementValue: '$550,000',
        },
        agentInformation: {
            name: 'Jane Smith',
            title: 'Luxury Home Specialist',
            phone: '(123) 456-7890',
            email: 'jane.smith@realestate.com',
            image: '/placeholder.svg?height=100&width=100',
        },
        documents: [
            {
                name: 'Property Disclosure Statement',
                url: '/path/to/property-disclosure-statement.pdf',
            },
            {
                name: 'Floor Plans',
                url: '/path/to/floor-plans.pdf',
            },
            {
                name: 'Home Inspection Report',
                url: '/path/to/home-inspection-report.pdf',
            },
        ],
    }
}

export const deleteProperty = async (id: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Simulate successful deletion
    console.log(`Deleted property with ID: ${id}`)
}

export interface DashboardData {
    agentRanking: {
        rank: string
        title: string
        salesVolume: string
        transactions: number
        clientSatisfaction: string
    }
    managersNotes: {
        title: string
        description: string
    }[]
    recentUpdates: {
        avatar?: string
        fallback?: string
        icon?: string
        name?: string
        title?: string
        message: string
        time: string
    }[]
    newClients: {
        count: number
        percentageChange: string
        lineData: {
            id: string
            data: {
                x: string
                y: number
            }[]
        }[]
    }
    propertyDistribution: {
        id: string
        value: number
    }[]
    propertyTypes: {
        property: string
        'For Sale': number
        'For Rent': number
    }[]
    crmUpdates: {
        icon: string
        title: string
        description: string
    }[]
}

const DUMMY_DASHBOARD_DATA = {
    agentRanking: {
        rank: '2nd',
        title: 'Top Performer',
        salesVolume: '$5.2M',
        transactions: 18,
        clientSatisfaction: '4.9/5',
    },
    managersNotes: [
        {
            title: 'Team Meeting',
            description: 'Tomorrow at 10 AM - Quarterly review',
        },
        {
            title: 'Update Listings',
            description: 'Ensure all property information is up-to-date by Friday',
        },
        {
            title: 'Client Follow-ups',
            description: 'Schedule follow-up calls with recent buyers',
        },
    ],
    recentUpdates: [
        {
            avatar: '/placeholder.svg?height=36&width=36',
            fallback: 'JD',
            name: 'John Doe',
            message: 'Interested in scheduling a viewing for 123 Main St.',
            time: 'Just now',
        },
        {
            icon: 'Home',
            title: 'New Property Listed',
            message: '456 Oak Ave has been added to your listings.',
            time: '2 hours ago',
        },
        {
            avatar: '/placeholder.svg?height=36&width=36',
            fallback: 'JS',
            name: 'Jane Smith',
            message: 'Requested a price reduction for 789 Pine St.',
            time: 'Yesterday',
        },
    ],
    newClients: {
        count: 24,
        percentageChange: '+12%',
        lineData: [
            {
                id: 'New Clients',
                data: [
                    { x: 'Week 1', y: 3 },
                    { x: 'Week 2', y: 5 },
                    { x: 'Week 3', y: 7 },
                    { x: 'Week 4', y: 9 },
                ],
            },
        ],
    },
    propertyDistribution: [
        { id: 'For Sale', value: 65 },
        { id: 'For Rent', value: 35 },
    ],
    propertyTypes: [
        { property: 'Apartments', 'For Sale': 25, 'For Rent': 18 },
        { property: 'Houses', 'For Sale': 40, 'For Rent': 17 },
    ],
    crmUpdates: [
        {
            icon: 'Bell',
            title: 'New Notification System',
            description: 'Get real-time alerts for important events.',
        },
        {
            icon: 'DollarSign',
            title: 'Enhanced Financial Reporting',
            description: 'New tools for tracking commissions and expenses.',
        },
        {
            icon: 'Users',
            title: 'Improved Client Management',
            description: 'Better tools for managing client relationships and preferences.',
        },
    ],
}

export async function getDashboardData(): Promise<DashboardData> {
    await new Promise((resolve) => setTimeout(resolve, 2000))

    return DUMMY_DASHBOARD_DATA
}

export type SearchResult = {
    id: string
    type: string
    title: string
    link: string
}

export const search = async (query: string): Promise<SearchResult[]> => {
    const results: SearchResult[] = [
        { id: '123456', type: 'property', title: 'Flat in San Francisco' },
        { id: '654321', type: 'property', title: 'House in Los Angeles' },
        { id: '789012', type: 'property', title: 'Condo in Miami' },
        { id: '123456', type: 'contact', title: 'John Doe' },
        { id: '654321', type: 'contact', title: 'Alice Johnson' },
        { id: '789012', type: 'contact', title: 'Michael Brown' },
    ].map((result) => ({
        ...result,
        link: result.type === 'property' ? `/properties/${result.id}` : `/contacts/${result.id}`,
    }))

    await new Promise((resolve) => setTimeout(resolve, 1000))

    return results.filter((result) => result.title.toLowerCase().includes(query.toLowerCase()))
}

interface UserProfile {
    profileImage: string
    fullName: string
    email: string
    phone: string
    license: string
    currentPassword?: string
    newPassword?: string
    confirmPassword?: string
}

const DUMMY_USER_PROFILE: UserProfile = {
    profileImage: '/avatar.jpg',
    fullName: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    license: '123456789',
}

export async function getUserProfile(): Promise<UserProfile> {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return DUMMY_USER_PROFILE
}

export async function editUserProfile(data: UserProfile): Promise<UserProfile> {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return data
}

interface AgencyData {
    logo: string
    name: string
    license: string
    phone: string
    email: string
    address: string
    website: string
}

const DUMMY_AGENCY_DATA: AgencyData = {
    logo: '/logo.jpg',
    name: 'Real Estate Agency',
    license: '123456789',
    phone: '+1 (555) 123-4567',
    email: 'realstateagency@gmail.com',
    address: '123 Main St, Anytown, USA 12345',
    website: 'realestateagency.com',
}

export async function getAgencyData(): Promise<AgencyData> {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return DUMMY_AGENCY_DATA
}

export async function editAgencyData(data: AgencyData): Promise<AgencyData> {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return data
}
