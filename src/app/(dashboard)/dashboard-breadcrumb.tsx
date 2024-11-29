'use client'

import { Fragment } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
} from '@/components/ui/breadcrumb'

import { usePathname } from 'next/navigation'

export default function DashboardBreadcrumb() {
    const pathname = usePathname()
    const path = pathname.split('/').filter(Boolean)

    return (
        <Breadcrumb className='hidden md:flex'>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href='/'>Dashboard</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                {path.map((segment, index) => {
                    const href = '/' + path.slice(0, index + 1).join('/')
                    const breadcrumbName = segment.charAt(0).toUpperCase() + segment.slice(1)

                    return (
                        <Fragment key={href}>
                            <ChevronRight className='h-4 w-4 text-muted-foreground' />
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href={href}>{breadcrumbName}</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </Fragment>
                    )
                })}
            </BreadcrumbList>
        </Breadcrumb>
    )
}
