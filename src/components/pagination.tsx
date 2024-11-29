'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PaginationLinks, PaginationMeta } from '../interfaces/pagination'

interface PaginationProps {
    links: PaginationLinks
    meta: PaginationMeta
    onPageChange: (page: number) => void
}

export default function Pagination({ links, meta, onPageChange }: PaginationProps) {
    const handlePageInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const page = parseInt(event.target.value, 10)
        if (!isNaN(page) && page >= 1 && page <= meta.last_page) {
            onPageChange(page)
        }
    }

    const LinkButton = ({
        href,
        disabled,
        children,
    }: {
        href: string | null
        disabled: boolean
        children: React.ReactNode
    }) => {
        if (disabled || !href) {
            return <Button disabled>{children}</Button>
        }
        return (
            <Link href={href}>
                <Button
                    onClick={(e) => {
                        e.preventDefault()
                        const url = new URL(href, window.location.origin)
                        const page = url.searchParams.get('page')
                        if (page) {
                            onPageChange(parseInt(page, 10))
                        }
                    }}
                >
                    {children}
                </Button>
            </Link>
        )
    }

    return (
        <div className='flex items-center justify-center space-x-6 pt-4'>
            <div className='flex items-center space-x-2'>
                <LinkButton href={links.first} disabled={meta.current_page === 1}>
                    First
                </LinkButton>
                <LinkButton href={links.prev} disabled={!links.prev}>
                    Previous
                </LinkButton>
            </div>
            <div className='flex items-center space-x-2'>
                <span>Page</span>
                <input
                    type='number'
                    min={1}
                    max={meta.last_page}
                    value={meta.current_page}
                    onChange={handlePageInputChange}
                    className='w-16 rounded-md border px-2 py-1 text-center'
                />
                <span>of {meta.last_page}</span>
            </div>
            <div className='flex items-center space-x-2'>
                <LinkButton href={links.next} disabled={!links.next}>
                    Next
                </LinkButton>
                <LinkButton href={links.last} disabled={meta.current_page === meta.last_page}>
                    Last
                </LinkButton>
            </div>
        </div>
    )
}
