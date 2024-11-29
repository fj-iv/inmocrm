import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
    return (
        <div className='container mx-auto p-4 sm:p-6'>
            <Card>
                <CardHeader className='flex flex-col items-start gap-4 sm:flex-row'>
                    <Skeleton className='h-24 w-24 rounded-full' />
                    <div className='flex-grow'>
                        <Skeleton className='mb-2 h-8 w-3/4' />
                        <Skeleton className='mb-4 h-4 w-1/2' />
                        <div className='flex flex-wrap gap-2'>
                            <Skeleton className='h-6 w-20' />
                            <Skeleton className='h-6 w-24' />
                            <Skeleton className='h-6 w-28' />
                        </div>
                    </div>
                </CardHeader>
                <CardContent className='space-y-8'>
                    <div className='grid gap-4 sm:grid-cols-2'>
                        <Card>
                            <CardHeader className='pb-2'>
                                <CardTitle>
                                    <Skeleton className='h-6 w-40' />
                                </CardTitle>
                            </CardHeader>
                            <CardContent className='space-y-4'>
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className='space-y-2'>
                                        <Skeleton className='h-4 w-24' />
                                        <Skeleton className='h-10 w-full' />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                        <div className='space-y-4'>
                            <Card>
                                <CardHeader className='pb-2'>
                                    <CardTitle>
                                        <Skeleton className='h-6 w-40' />
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className='space-y-4'>
                                    {[...Array(4)].map((_, i) => (
                                        <div key={i} className='space-y-2'>
                                            <Skeleton className='h-4 w-24' />
                                            <Skeleton className='h-10 w-full' />
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className='pb-2'>
                                    <CardTitle>
                                        <Skeleton className='h-6 w-40' />
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className='space-y-4'>
                                    {[...Array(3)].map((_, i) => (
                                        <div key={i} className='space-y-2'>
                                            <Skeleton className='h-4 w-24' />
                                            <Skeleton className='h-10 w-full' />
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                    <Card>
                        <CardHeader className='pb-2'>
                            <CardTitle>
                                <Skeleton className='h-6 w-40' />
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className='mb-4 flex flex-wrap gap-2'>
                                {[...Array(4)].map((_, i) => (
                                    <Skeleton key={i} className='h-8 w-24' />
                                ))}
                            </div>
                            <Skeleton className='h-10 w-full' />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className='pb-2'>
                            <CardTitle>
                                <Skeleton className='h-6 w-40' />
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Skeleton className='h-10 w-full' />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className='pb-2'>
                            <CardTitle>
                                <Skeleton className='h-6 w-40' />
                            </CardTitle>
                        </CardHeader>
                        <CardContent className='space-y-4'>
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className='space-y-1'>
                                    <Skeleton className='h-4 w-full' />
                                    <Skeleton className='h-3 w-1/2' />
                                </div>
                            ))}
                            <Skeleton className='h-24 w-full' />
                        </CardContent>
                    </Card>
                    <div className='flex justify-end gap-4'>
                        <Skeleton className='h-10 w-24' />
                        <Skeleton className='h-10 w-32' />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
