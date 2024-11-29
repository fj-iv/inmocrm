import Contact from './contact'
import { getContact } from '@/lib/db'

interface ContactPageProp {
    params: {
        id: string
    }
}

export default async function ContactPage({ params }: ContactPageProp) {
    const contact = await getContact(params.id)

    return <Contact contact={contact} />
}
