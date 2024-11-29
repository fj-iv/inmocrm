import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import PaginationSkeleton from './pagination-skeleton'

type TableSkeletonProps = {
    columns: number
    rows: number
    showActions?: boolean
    showPagination?: boolean
}

export default function TableSkeleton({
    columns,
    rows,
    showActions = true,
    showPagination = true,
}: TableSkeletonProps) {
    const totalColumns = showActions ? columns + 1 : columns
    const columnWidth = `${100 / totalColumns}%`

    return (
        <div className='w-full'>
            <Table>
                <TableHeader>
                    <TableRow>
                        {Array.from({ length: columns }).map((_, index) => (
                            <TableHead key={index} style={{ width: columnWidth }}>
                                <Skeleton className='h-4 w-full' />
                            </TableHead>
                        ))}
                        {showActions && (
                            <TableHead style={{ width: columnWidth }}>
                                <span className='sr-only'>Actions</span>
                            </TableHead>
                        )}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Array.from({ length: rows }).map((_, rowIndex) => (
                        <TableRow key={rowIndex}>
                            {Array.from({ length: columns }).map((_, colIndex) => (
                                <TableCell key={colIndex} style={{ width: columnWidth }}>
                                    <Skeleton className='h-4 w-full' />
                                </TableCell>
                            ))}
                            {showActions && (
                                <TableCell style={{ width: columnWidth }}>
                                    <Skeleton className='h-8 w-8 rounded-full' />
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {showPagination && <PaginationSkeleton />}
        </div>
    )
}
