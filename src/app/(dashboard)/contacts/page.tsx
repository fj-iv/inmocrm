'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Contacts from './contacts'
import { getContacts } from '@/lib/db'
import { PaginationLinks, PaginationMeta } from '@/interfaces/pagination'
import { ContactListing } from '@/lib/db'
import Loading from './loading'

export default function ContactsPage() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [contactsData, setContactsData] = useState<{
        data: ContactListing[]
        links: PaginationLinks
        meta: PaginationMeta
    } | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const page = searchParams.get('page') ? parseInt(searchParams.get('page')!, 10) : 1

        const fetchContacts = async () => {
            setIsLoading(true)
            const result = await getContacts(page)
            setContactsData(result)
            setIsLoading(false)
        }

        fetchContacts()
    }, [searchParams])

    const handlePageChange = (newPage: number) => {
        router.push(`/contacts?page=${newPage}`)
    }


    if (isLoading || !contactsData) {
        return <Loading />
    }

    return (
        <Contacts
            data={contactsData.data}
            links={contactsData.links}
            meta={contactsData.meta}
            onPageChange={handlePageChange}
        />
    )
}
