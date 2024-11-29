import ContactForm from '../../contact-form'
import { getContact } from '@/lib/db'

interface EditContactPageProps {
    params: {
        id: string
    }
}

export default async function EditContactPage({ params }: EditContactPageProps) {
    const contact = await getContact(params.id)

    return <ContactForm contact={contact} isEditing />
}
