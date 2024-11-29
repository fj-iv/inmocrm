import PropertyForm from '../../property-form'
import { getProperty } from '@/lib/db'

interface EditPropertyPageProps {
    params: {
        id: string
    }
}

export default async function EditPropertyPage({ params }: EditPropertyPageProps) {
    const property = await getProperty(params.id)

    return <PropertyForm property={property} isEditing />
}
