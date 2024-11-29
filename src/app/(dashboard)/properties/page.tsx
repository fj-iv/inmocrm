'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Properties from './properties'
import { getProperties } from '@/lib/db'
import { PaginationLinks, PaginationMeta } from '@/interfaces/pagination'
import { PropertyListing } from '@/lib/db'
import Loading from './loading'

export default async function PropertiesPage() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [propertiesData, setPropertiesData] = useState<{
        data: PropertyListing[]
        links: PaginationLinks
        meta: PaginationMeta
    } | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const page = searchParams.get('page') ? parseInt(searchParams.get('page')!, 10) : 1

        const fetchProperties = async () => {
            setIsLoading(true)
            const result = await getProperties(page)
            setPropertiesData(result)
            setIsLoading(false)
        }

        fetchProperties()
    }, [searchParams])

    const handlePageChange = (newPage: number) => {
        router.push(`/properties?page=${newPage}`)
    }

    if (isLoading || !propertiesData) {
        return <Loading />
    }

    return (
        <Properties
            data={propertiesData.data}
            links={propertiesData.links}
            meta={propertiesData.meta}
            onPageChange={handlePageChange}
        />
    )
}
