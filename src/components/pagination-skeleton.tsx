import { Skeleton } from '@/components/ui/skeleton'
import { Pagination, PaginationContent, PaginationItem } from '@/components/ui/pagination'

type PaginationSkeletonProps = {
    itemCount?: number
}

export default function PaginationSkeleton({ itemCount = 5 }: PaginationSkeletonProps = {}) {
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <Skeleton className='h-10 w-10 rounded-md' />
                </PaginationItem>
                {Array.from({ length: itemCount }).map((_, index) => (
                    <PaginationItem key={index}>
                        <Skeleton className='h-10 w-10 rounded-md' />
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <Skeleton className='h-10 w-10 rounded-md' />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}
