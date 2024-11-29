import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
    return (
        <div className='container mx-auto p-4 sm:p-6'>
            <Card>
                <CardHeader className='flex flex-col items-center gap-4 sm:flex-row sm:items-start'>
                    <Skeleton className='h-24 w-24 rounded-full' />
                    <div className='flex-grow text-center sm:text-left'>
                        <Skeleton className='mb-2 h-8 w-48' />
                        <Skeleton className='mb-4 h-4 w-36' />
                        <div className='mt-2 flex flex-wrap justify-center gap-2 sm:justify-start'>
                            <Skeleton className='h-6 w-16' />
                            <Skeleton className='h-6 w-24' />
                            <Skeleton className='h-6 w-28' />
                        </div>
                        <div className='mt-2 flex flex-wrap justify-center gap-2 sm:justify-start'>
                            <Skeleton className='h-6 w-20' />
                            <Skeleton className='h-6 w-28' />
                        </div>
                    </div>
                    <div className='mt-4 flex flex-col gap-2 sm:mt-0 sm:flex-row'>
                        <Skeleton className='h-10 w-32' />
                        <Skeleton className='h-10 w-24' />
                        <Skeleton className='h-10 w-10' />
                    </div>
                </CardHeader>
                <CardContent className='grid gap-6'>
                    <div className='grid gap-4 sm:grid-cols-2'>
                        <Card>
                            <CardHeader>
                                <Skeleton className='h-6 w-40' />
                            </CardHeader>
                            <CardContent className='grid gap-2'>
                                {Array.from({ length: 4 }).map((_, index) => (
                                    <div key={index} className='flex items-center gap-2'>
                                        <Skeleton className='h-4 w-4 rounded-full' />
                                        <Skeleton className='h-4 w-full' />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <Skeleton className='h-6 w-40' />
                            </CardHeader>
                            <CardContent className='grid gap-2'>
                                {[...Array(4)].map((_, index) => (
                                    <div key={index} className='flex items-center justify-between'>
                                        <Skeleton className='h-4 w-24' />
                                        <Skeleton className='h-4 w-32' />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                    <div className='grid gap-4 sm:grid-cols-2'>
                        <Card>
                            <CardHeader>
                                <Skeleton className='h-6 w-40' />
                            </CardHeader>
                            <CardContent className='grid gap-2'>
                                {[...Array(3)].map((_, index) => (
                                    <div key={index} className='flex items-center justify-between'>
                                        <Skeleton className='h-4 w-24' />
                                        <div className='flex items-center gap-2'>
                                            <Skeleton className='h-6 w-6 rounded-full' />
                                            <Skeleton className='h-4 w-32' />
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <Skeleton className='h-6 w-40' />
                            </CardHeader>
                            <CardContent className='grid gap-2'>
                                {[...Array(3)].map((_, index) => (
                                    <div key={index} className='flex items-center justify-between'>
                                        <Skeleton className='h-4 w-24' />
                                        <Skeleton className='h-4 w-32' />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                    <Card>
                        <CardHeader>
                            <Skeleton className='h-6 w-40' />
                        </CardHeader>
                        <CardContent className='flex flex-wrap gap-2'>
                            {Array.from({ length: 5 }).map((_, index) => (
                                <div
                                    key={index}
                                    className='h-6 w-24 animate-pulse rounded-md bg-muted'
                                />
                            ))}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <Skeleton className='h-6 w-40' />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className='mb-2 h-4 w-full' />
                            <div className='mt-2 flex justify-between'>
                                {[...Array(4)].map((_, index) => (
                                    <Skeleton key={index} className='h-4 w-16' />
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <Skeleton className='h-6 w-40' />
                        </CardHeader>
                        <CardContent>
                            <ul className='space-y-4'>
                                {[...Array(3)].map((_, index) => (
                                    <li key={index} className='flex items-center gap-4'>
                                        <div className='h-2 w-2 flex-shrink-0 rounded-full bg-muted-foreground' />
                                        <div className='grid w-full gap-0.5'>
                                            <Skeleton className='h-4 w-full' />
                                            <Skeleton className='h-3 w-24' />
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <Skeleton className='h-6 w-40' />
                        </CardHeader>
                        <CardContent>
                            <ul className='space-y-4'>
                                {[...Array(3)].map((_, index) => (
                                    <li key={index} className='grid gap-1'>
                                        <Skeleton className='h-4 w-full' />
                                        <Skeleton className='h-3 w-48' />
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </CardContent>
            </Card>
        </div>
    )
}
