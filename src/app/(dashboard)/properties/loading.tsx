import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import TableSkeleton from '@/components/table-skeleton'

export default function Loading() {
    return (
        <Card className='w-full'>
            <div className='flex justify-between'>
                <CardHeader>
                    <CardTitle className='truncate'>Properties List</CardTitle>
                    <CardDescription className='truncate'>
                        Manage your properties and view their details.
                    </CardDescription>
                </CardHeader>
                <Skeleton className='mr-4 mt-4 h-10 w-28 px-4 py-2' />
            </div>
            <CardContent>
                <TableSkeleton columns={15} rows={7} />
            </CardContent>
            <CardFooter>
                <Skeleton className='h-2 w-36 rounded-full' />
            </CardFooter>
        </Card>
    )
}
