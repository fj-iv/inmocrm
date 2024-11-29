import Property from './property'
import { getProperty } from '@/lib/db'

interface PropertyPageProps {
    params: {
        id: string
    }
}

export default async function PropertyPage({ params }: PropertyPageProps) {
    const property = await getProperty(params.id)

    return <Property property={property} />
}
